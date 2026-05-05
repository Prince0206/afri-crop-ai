// components/FeedbackPrompt.tsx
import { useState } from "react";

export default function FeedbackPrompt({
  conversationId,
  onClose,
}: {
  conversationId: string;
  onClose: () => void;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    await fetch(`/api/conversations/${conversationId}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating,
        feedback: comment,
        helpful: rating! >= 4,
      }),
    });
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  if (submitted)
    return (
      <div className="p-6 text-center">
        <p className="text-2xl">🙏</p>
        <p className="mt-2">Asante! Thanks for the feedback.</p>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
      <h3 className="font-bold text-lg mb-2">Did this advice help?</h3>
      <div className="flex gap-2 my-4 justify-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-3xl transition ${
              rating && n <= rating ? "scale-110" : "opacity-40"
            }`}
          >
            ⭐
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Anything else to share? (optional)"
        className="w-full border rounded-lg p-2 text-sm"
        rows={3}
      />
      <button
        onClick={submit}
        disabled={!rating}
        className="mt-3 w-full bg-green-700 text-white py-2 rounded-lg disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
