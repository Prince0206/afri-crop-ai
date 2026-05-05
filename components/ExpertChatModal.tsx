"use client";
import { useState } from "react";

export default function ExpertChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi! I’m your Agro Advisor. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Call backend API (AI or human)
    const res = await fetch("/api/expert-chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    setMessages([...messages, { role: "assistant", content: data.reply }]);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-3">Ask an Agronomist</h3>
        <div className="mb-4 h-[250px] overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-2 ${m.role === "user" ? "text-right" : ""}`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-green-100 text-green-900"
                    : m.role === "assistant"
                      ? "bg-blue-100 text-blue-900"
                      : ""
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top‑4 right‑4 text‑gray‑400 hover:text‑gray‑600"
        >
          ×
        </button>
      </div>
    </div>
  );
}
