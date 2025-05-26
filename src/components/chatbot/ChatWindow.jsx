"use client";

import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([{ sender: "Chatbot", content: "Hola 👋 ¿En qué puedo ayudarte?" }]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

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

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "Tú", content: input };
    setMessages((prev) => [...prev, userMsg]);
    ws.current?.send(JSON.stringify(userMsg));
    setInput("");
  };

  return (
    <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">Asistente Virtual 🤖</h2>
        <button onClick={onClose} className="text-red-500">✖</button>
      </div>
      <div className="h-64 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <ChatMessage key={i} sender={m.sender} content={m.content} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-1 rounded"
          placeholder="Escribe algo..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-3 rounded">Enviar</button>
      </div>
    </div>
  );
}
