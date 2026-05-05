import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { messages } = JSON.parse(req.body);

  // Call OpenAI GPT with system prompt for agro expertise.
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt‑4o",
      messages: [
        {
          role: "system",
          content:
            "You are a world-class agronomist helping smallholder farmers in Africa. Answer questions clearly and concisely.",
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    // Fallback to human expert (email notification or SMS alert)
    // ...
    res
      .status(500)
      .json({ reply: "Sorry, our AI expert is unavailable right now." });
  }
}
