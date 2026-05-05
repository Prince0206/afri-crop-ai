import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    fetch("/api/admin/conversations")
      .then((r) => r.json())
      .then(setConvos);
    const interval = setInterval(() => {
      fetch("/api/admin/conversations")
        .then((r) => r.json())
        .then(setConvos);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Expert Inbox</h1>
      <ul className="divide-y">
        {convos.map((c: any) => (
          <li key={c.id} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">
                {c.userName || "Farmer"} · {c.cropContext || "—"}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-md">
                {c.messages[0]?.content}
              </p>
            </div>
            <Link
              href={`/admin/${c.id}`}
              className="text-green-700 font-semibold"
            >
              Open →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
