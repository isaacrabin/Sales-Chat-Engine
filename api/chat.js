import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { history, system } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: system },
        ...history
      ],
    });

    res.status(200).json({
      success: true,
      text: response.choices[0].message.content,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
