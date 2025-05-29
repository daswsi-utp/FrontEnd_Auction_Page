"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBotBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <ChatWindow onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        aria-label="Abrir ChatBot"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        💬
      </motion.button>
    </>
  );
}
