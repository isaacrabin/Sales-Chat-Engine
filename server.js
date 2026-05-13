import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Serve your HTML app
app.use(express.static("."));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { history, system } = req.body;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
            role: "system",
            content: system
            },
            ...history
        ]
    });

    res.json({
      success: true,
      text: response.content[0].text,
    });

  } catch (error) {
    console.error("Anthropic Error:", error);

    res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🦁 Fadhili server running on http://localhost:${PORT}`);
});
