import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import fetch from 'node-fetch';

global.fetch = fetch;

const systemPrompt = `
You are a virtual assistant designed to help students find the best professors based on their specific needs and queries. You achieve this by leveraging a Retrieval-Augmented Generation (RAG) approach. For every student query, you will retrieve relevant information and then generate a response that highlights the top three professors who best match the student's criteria.

Follow these guidelines:

Understanding the Query:

Carefully analyze the student's query to identify the subject, course, department, or specific qualities they are looking for in a professor (e.g., teaching style, ease of grading, etc.).
Ensure that you grasp both explicit and implicit preferences stated by the student.
Retrieval:

Use a retrieval mechanism to access a large dataset of professor reviews, ratings, and other relevant information from RateMyProfessor or similar sources.
Focus on finding professors whose strengths and attributes align with the student's query.
Generation:

Summarize the top three professors that best match the student's criteria.
For each professor, include:
Name
Department/Course
Average Rating (if available)
Key Strengths (based on student reviews)
Relevant Review Excerpts (optional, if adding value to the response)
Response Structure:

Begin with a brief summary of how you selected the professors.
List the three professors in order of relevance but format it clearly to make it easy for the user to see each professor as well as each professor's summary.
Conclude with a prompt encouraging the student to ask further questions or refine their search if needed.
Tone and Style:

Be friendly, concise, and supportive.
Ensure clarity and provide actionable information that helps the student make an informed decision.
Example Interaction:

Student Query: "I'm looking for a professor who is great at teaching introductory psychology and is known to be fair with grading."

Response: "Based on your interest in an introductory psychology course with fair grading, here are the top three professors I recommend:

Dr. Jane Smith

Department: Psychology
Course: Introduction to Psychology
Average Rating: 4.8/5
Key Strengths: Clear explanations, approachable, and provides helpful feedback.
Review Highlight: 'Dr. Smith made complex topics easy to understand and was always willing to help outside of class.'
Prof. John Doe

Department: Psychology
Course: Intro to Behavioral Psychology
Average Rating: 4.6/5
Key Strengths: Fair grading, organized lectures, and engaging teaching style.
Review Highlight: 'Prof. Doe's lectures were always interesting, and his grading policy is very fair.'
Dr. Emily Johnson

Department: Psychology
Course: Foundations of Psychology
Average Rating: 4.7/5
Key Strengths: Friendly, fair exams, and responsive to student needs.
Review Highlight: 'Dr. Johnson is one of the most understanding professors I've had, and she really cares about her students.'
Feel free to ask if you need more information or if you'd like recommendations for a different course or teaching style!"
`;

export async function POST(req) {
    console.log("Received POST request in /api/chat");

    const model_id = "sentence-transformers/all-MiniLM-L6-v2";
    const data = await req.json();

    // Initialize Pinecone
    const pc = new Pinecone({ 
        apiKey: process.env.PINECONE_API_KEY 
    });
    const index = pc.index('rag').namespace('ns1');

    const text = data[data.length - 1].content;
    let embedding;

    const apiUrl = `https://api-inference.huggingface.co/pipeline/feature-extraction/${model_id}`;
    const headers = {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
    };

    // Generate embedding using Hugging Face
    try {
        const hfResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                inputs: text,
                options: {
                    wait_for_model: true,
                },
            }),
        });

        if (!hfResponse.ok) {
            throw new Error(`Error: ${hfResponse.status} ${hfResponse.statusText}`);
        }

        embedding = await hfResponse.json();
        console.log("Embedding generated:", embedding);

        if (Array.isArray(embedding[0])) {
            embedding = embedding.flat();
        }

        if (embedding.length !== 384) {
            throw new Error(`Embedding dimension mismatch: expected 384, got ${embedding.length}`);
        }
    } catch (error) {
        console.error("Error generating embedding with Hugging Face:", error);
        return NextResponse.json({ error: "Embedding Generation Error" }, { status: 500 });
    }

    // Query Pinecone with the generated embedding
    try {
        const results = await index.query({
            topK: 3,
            includeMetadata: true,
            vector: embedding,
        });

        console.log("Pinecone query results:", results);

        // Construct the response
        let resultString = 'Returned Results from Vector DB (done automatically):';
        results.matches.forEach((match) => {
            resultString += `
                \n
                Returned Results:
                Professor: ${match.id}
                Review: ${match.metadata.review}
                Subject: ${match.metadata.subject}
                Stars: ${match.metadata.stars}
                \n\n`;
        });

        const lastMessage = data[data.length - 1];
        const lastMessageContent = lastMessage.content + resultString;
        const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

        const completionResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.1-8b-instruct:free',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...lastDataWithoutLastMessage,
                    { role: 'user', content: lastMessageContent },
                ],
            }),
        });

        // Extract the user-facing content
        const completion = await completionResponse.json();
        const userFacingContent = completion.choices[0]?.message?.content;

        if (!userFacingContent) {
            throw new Error('Failed to extract content');
        }

        return NextResponse.json({ content: userFacingContent });
    } catch (error) {
        console.error("Error during completion or streaming:", error);
        return NextResponse.json({ error: "Completion or Streaming Error" }, { status: 500 });
    }
}
