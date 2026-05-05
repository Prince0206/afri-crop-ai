"use client";

import { useState, useRef } from "react";
import { useI18n } from "@/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ExpertChatModalProps {
  onClose: () => void;
}

export default function ExpertChatModal({ onClose }: ExpertChatModalProps) {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text && !image) return;

    setLoading(true);
    setError(null);

    try {
      let imageUrl: string | null = null;

      // Upload image first if one is attached
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadRes = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url as string;
        setImage(null);
        // Reset the file input
        if (fileInputRef.current) fileInputRef.current.value = "";
      }

      const userMessage: Message = { role: "user", content: text };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");

      const chatRes = await fetch("/api/expert-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, imageUrl }),
      });

      if (!chatRes.ok) throw new Error(t("chat.error"));

      const data = await chatRes.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("chat.error"));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("chat.title")}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {t("chat.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Message history */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white/80"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
          {loading && (
            <p className="text-xs text-gray-400 dark:text-white/40 italic">
              {t("chat.typing")}
            </p>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 dark:border-white/10 px-4 py-3 space-y-2">
          {/* Image attachment */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="chat-image-upload"
              className="text-xs text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline"
            >
              Attach image
            </label>
            <input
              id="chat-image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
            {image && (
              <span className="text-xs text-green-700 dark:text-green-400 truncate max-w-[200px]">
                {image.name}
              </span>
            )}
          </div>

          {/* Text input + send */}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder={t("chat.placeholder")}
              aria-label={t("chat.placeholder")}
              maxLength={500}
              rows={2}
              className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || (!input.trim() && !image)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end"
            >
              {t("chat.send")}
            </button>
          </div>
          <p className="text-right text-xs text-gray-400 dark:text-white/30">
            {input.length}/500
          </p>
        </div>
      </div>
    </div>
  );
}
