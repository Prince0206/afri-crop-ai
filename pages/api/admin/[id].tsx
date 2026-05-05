import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ConversationView() {
  const { query } = useRouter();
  const [convo, setConvo] = useState<any>(null);
  const [reply, setReply] = useState("");

  async function load() {
    if (!query.id) return;
    const data = await fetch(`/api/admin/conversations/${query.id}`).then((r) =>
      r.json(),
    );
    setConvo(data);
  }

  useEffect(() => {
    load();
  }, [query.id]);

  async function send() {
    if (!reply.trim()) return;
    await fetch("/api/admin/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: query.id, content: reply }),
    });
    setReply("");
    load();
  }

  if (!convo) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-4">{convo.userName || "Farmer"}</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {convo.messages.map((m: any) => (
          <div
            key={m.id}
            className={`p-2 rounded ${
              m.sender === "expert"
                ? "bg-green-100 ml-auto max-w-xs"
                : m.sender === "ai"
                  ? "bg-gray-100 max-w-xs"
                  : "bg-yellow-50 max-w-xs"
            }`}
          >
            <p className="text-xs uppercase text-gray-500">{m.sender}</p>
            <p>{m.content}</p>
            {m.imageUrl && (
              <img src={m.imageUrl} className="rounded mt-1 max-h-40" />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply…"
          className="flex-1 border rounded p-2"
        />
        <button onClick={send} className="bg-green-700 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
