// pages/history.tsx
import { useEffect, useState } from "react";
import { Conversation } from "@/lib/types";
import Link from "next/link";

export default function History() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/conversations/mine")
      .then((r) => r.json())
      .then((data) => {
        setConversations(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading your scans...</div>;

  if (!conversations.length)
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-4">No scans yet.</p>
        <Link href="/scan" className="text-green-700 underline">
          Start your first scan
        </Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your scan history</h1>
      <ul className="space-y-3">
        {conversations.map((c) => (
          <li
            key={c.id}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            <Link href={`/history/${c.id}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold capitalize">{c.cropType}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {c.question}
                  </p>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({ status }: { status: Conversation["status"] }) {
  const map: Record<Conversation["status"], { label: string; color: string }> =
    {
      pending: { label: "Waiting", color: "bg-yellow-100 text-yellow-800" },
      ai_answered: { label: "AI replied", color: "bg-blue-100 text-blue-800" },
      expert_answered: {
        label: "Expert replied",
        color: "bg-green-100 text-green-800",
      },
      resolved: { label: "Resolved", color: "bg-gray-100 text-gray-700" },
      open: { label: "Open", color: "bg-blue-100 text-blue-800" },
      awaiting_expert: {
        label: "Awaiting expert",
        color: "bg-orange-100 text-orange-800",
      },
    };
  const s = map[status];
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${s.color}`}>
      {s.label}
    </span>
  );
}
