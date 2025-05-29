"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "Chatbot", content: "Hola ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const ws = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/ws/chat");
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "Tú", content: input };
    setMessages((prev) => [...prev, userMsg]);
    ws.current?.send(JSON.stringify(userMsg));
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-6 max-w-sm w-full rounded-lg shadow-lg z-50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-lg">Asistente Virtual 🤖</h2>
        <button onClick={onClose} className="text-red-500 text-xl">✖</button>
      </div>

      <div className="h-64 overflow-y-auto px-3 py-2 bg-gray-50 dark:bg-gray-800">
        {messages.map((m, i) => (
          <ChatMessage key={i} sender={m.sender} content={m.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-3 py-1 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Escribe algo..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
