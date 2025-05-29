export default function ChatMessage({ sender, content }) {
  const isBot = sender === "Chatbot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
      <div
        className={`p-3 rounded-lg max-w-[75%] whitespace-pre-wrap break-words shadow
          ${isBot
            ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            : "bg-blue-600 text-white dark:bg-blue-500"}
        `}
      >
        <strong>{isBot ? "Bot" : "Tú"}:</strong> {content}
      </div>
    </div>
  );
}
