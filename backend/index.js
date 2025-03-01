import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Debugging: Log the API key
console.log("API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        // Validation
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Try "gpt-3.5-turbo" if this fails
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error Details:", error.response?.data || error.message);
        res.status(500).json({ error: "Error generating response", details: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));