// components/ExpertBadge.tsx
const BADGE_META = {
  verified: {
    label: "Verified",
    icon: "✓",
    color: "bg-blue-100 text-blue-800",
  },
  top_rated: {
    label: "Top Rated",
    icon: "⭐",
    color: "bg-yellow-100 text-yellow-800",
  },
  fast_responder: {
    label: "Fast Responder",
    icon: "⚡",
    color: "bg-green-100 text-green-800",
  },
};

export default function ExpertBadge({
  type,
}: {
  type: keyof typeof BADGE_META;
}) {
  const b = BADGE_META[type];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${b.color}`}
    >
      <span>{b.icon}</span>
      {b.label}
    </span>
  );
}
