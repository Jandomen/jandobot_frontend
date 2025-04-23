import { useState, useRef, useEffect } from "react";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !apiKey.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch(process.env.REACT_APP_API_BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, apiKey }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error al conectar con el bot." },
      ]);
    }

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 px-4 py-6">
      <div className="w-full max-w-4xl flex flex-col bg-white rounded-3xl shadow-2xl h-[90vh] overflow-hidden">
        <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
          🤖 CHAT CON JANDOBOT
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm md:text-base ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white rounded-br-none"
                  : "mr-auto bg-gray-300 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-4 border-t border-gray-200 bg-white"
        >
          <input
            type="password"
            placeholder="🔑 Tu API Key de OpenAI"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 text-black"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow px-4 py-2 rounded-xl border border-gray-300 text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
