import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { history = [], system = "" } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Missing OPENAI_API_KEY in environment variables",
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: system },
        ...history,
      ],
      temperature: 0.7,
    });

    return res.status(200).json({
      success: true,
      text: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("OpenAI Error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}