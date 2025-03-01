import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages([...messages, userMessage]);

        try {
            const { data } = await axios.post("http://localhost:5000/chat", { message: input });
            setMessages([...messages, userMessage, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages([...messages, { role: "assistant", content: "Error occurred, try again!" }]);
        }

        setInput("");
    };
    
  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
    <h2>AI Chatbot</h2>
    <div style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
            <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                <b>{msg.role === "user" ? "You: " : "Bot: "}</b>{msg.content}
            </p>
        ))}
    </div>
    <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "80%", padding: "8px", marginTop: "10px" }}
    />
    <button onClick={handleSend} style={{ padding: "8px", marginLeft: "10px" }}>Send</button>
</div>
  )
}

export default ChatBot
