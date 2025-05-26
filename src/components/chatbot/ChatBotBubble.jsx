"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatBotBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Abrir ChatBot"
      >
        💬
      </button>
    </>
  );
}
