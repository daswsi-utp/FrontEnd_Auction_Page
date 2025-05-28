export default function ChatMessage({ sender, content }) {
  const isBot = sender === "Chatbot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
      <div className={`p-2 rounded-lg max-w-xs ${isBot ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}`}>
        <strong>{isBot ? "Bot" : "Tú"}:</strong> {content}
      </div>
    </div>
  );
}
