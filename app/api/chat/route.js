    import { NextResponse } from "next/server";
    import { Pinecone } from "@pinecone-database/pinecone";
    import { OpenAI } from 'openai';
    const systemPrompt =
    `
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
    List the three professors in order of relevance.
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
    `

    export async function POST(req) {
        try {
            const data = await req.json()
            const pc = new Pinecone({
                apiKey: process.env.PINECONE_API_KEY,
            })
    
            const index = pc.Index('rag').namespace('ns1')
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env.OPENROUTER_API_KEY,
            });
    
            const text = data[data.length - 1].content
            const embedding = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: text,
                encoding_format: 'float',
            })
    
            const results = await index.query({
                topK: 3,
                includeMetadata: true,
                vector: embedding.data[0].embedding,
            })
    
            let resultString = ''
            results.matches.forEach((match) => {
                resultString += `
                    \n
                    Returned Results:
                    Professor: ${match.id}
                    Review: ${match.metadata.stars}
                    Subject: ${match.metadata.subject}
                    Stars: ${match.metadata.stars}
                    \n\n`
            })
    
            const lastMessage = data[data.length - 1]
            const lastMessageContent = lastMessage.content + resultString
            const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    
            const completion = await openai.chat.completions.create({
                messages: [
                {role: 'system', content: systemPrompt},
                ...lastDataWithoutLastMessage,
                {role: 'user', content: lastMessageContent},
                ],
                model: 'gpt-3.5-turbo',
                stream: true,
            })
    
            const stream = new ReadableStream({
                async start(controller) {
                const encoder = new TextEncoder()
                try {
                    for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                    }
                } catch (err) {
                    controller.error(err)
                } finally {
                    controller.close()
                }
                },
            })
    
            return new NextResponse(stream)

        } catch (error) {
            console.error("Error processing the request:", error);
            return NextResponse.error();
        }
 
    }