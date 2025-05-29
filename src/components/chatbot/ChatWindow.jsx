"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: "Chatbot", content: "Hola 👋 ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/ws/chat");
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    // Autoenfoque
    inputRef.current?.focus();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "Tú", content: input };
    setMessages((prev) => [...prev, userMsg]);
    ws.current?.send(JSON.stringify(userMsg));
    setInput("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-24 right-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-4 w-80 z-50"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold">Asistente Virtual 🤖</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">✖</button>
        </div>
        <div className="h-64 overflow-y-auto mb-2 space-y-1">
          {messages.map((m, i) => (
            <ChatMessage key={i} sender={m.sender} content={m.content} />
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border p-1 rounded dark:bg-gray-700 dark:border-gray-600"
            placeholder="Escribe algo..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded"
          >
            Enviar
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
