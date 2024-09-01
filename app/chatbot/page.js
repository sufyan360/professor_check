"use client"
import { Box, Stack, TextField, Button } from "@mui/material";
import { useState, useEffect, useRef} from "react";
import Navbar from '../navbar'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Rate My Professor support assistant. How can I assist you today?"
    }
  ]);

  const [message, setMessage] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom every time messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    console.log("sendMessage triggered");
    console.log("Current message:", message);
    
    setMessage('');

    setMessages((messages) => [
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: '' }
    ]);

    console.log("Sending fetch request to /api/chat");

    const response = await fetch('../api/chat', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
    });

    if (response.ok) {
        const result = await response.json();
        console.log("Fetch successful, processing response");

        setMessages((messages) => {
            let lastMessage = messages[messages.length - 1];
            let otherMessages = messages.slice(0, messages.length - 1);
            return [
                ...otherMessages,
                { ...lastMessage, content: result.content },  // Only show the relevant content
            ];
        });
    } else {
        console.error("Failed to fetch the response");
        // Handle the error appropriately
    }
};

  

  return (
    <>
    <Navbar chat={true}/>
    <Box
      width={"100vw"}
      height={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{mt:10}}
      bgcolor={"#9ec2b6"}
    >
      <Stack
        direction={"column"}
        width={"35%"}
        height={"95%"}
        border={"1px solid #2a416a"}
        bgcolor={"white"}
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow={"auto"}
          maxHeight={"100%"}
        >
          {
            messages.map((message, index) => (
              <Box
                key={index}
                display={"flex"}
                justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              >
                <Box
                  bgcolor={message.role === 'assistant' ? '#2a416a' : '#258786'}
                  color="white"
                  borderRadius={16}
                  p={3}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          <div ref={endOfMessagesRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            autoComplete="off"
            autoCapitalize="on"
            fullWidth
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{bgcolor:'#258786', '&:hover': {bgcolor: '#ca7558'}}}
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </Stack>
      </Stack>
    </Box>
  </>
  );
}
