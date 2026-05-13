export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { history } = req.body || {};
  const lastMessage = history?.[history.length - 1]?.content || "";

  // simple fake "AI thinking delay"
  await new Promise((r) => setTimeout(r, 800));

  let reply = "";

  if (lastMessage.toLowerCase().includes("term")) {
    reply = "Term Life Cover is a great starting point. It gives pure protection for your loved ones at an affordable premium. May I know your age so I can tailor it better?";
  } 
  else if (lastMessage.toLowerCase().includes("price") || lastMessage.toLowerCase().includes("cost")) {
    reply = "Premiums depend on your age, coverage amount, and term. For most clients, plans start from a few thousand KES per month.";
  }
  else if (lastMessage.toLowerCase().includes("education")) {
    reply = "Our Education Policy helps you save for your child’s future while also providing life cover. What age is your child?";
  }
  else {
    reply = "Karibu! I’m here to help you choose the right life insurance plan. Could you tell me a bit about your goals — protection, savings, or retirement?";
  }

  return res.status(200).json({
    success: true,
    text: reply,
  });
}
