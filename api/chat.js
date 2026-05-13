export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { history = [], system = "" } = req.body || {};

    const messages = [
      { role: "system", content: system },
      ...history,
    ];

    const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ZAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "glm-4.5-flash",
        messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        success: false,
        error: data,
      });
    }

    const text = data.choices?.[0]?.message?.content;

    return res.status(200).json({
      success: true,
      text,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
