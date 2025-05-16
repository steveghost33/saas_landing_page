// src/sections/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m the Ella Tech Strategy Expert. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Drag state
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Global handlers for dragging
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging) return;
      setPosition({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    };
    const onMouseUp = () => setDragging(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  const onMouseDown = (e) => {
    setDragging(true);
    setRel({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.preventDefault();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setInput("");

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: import.meta.env.VITE_OPENAI_MODEL,
          messages: [
            ...messages.map((m) => ({
              role: m.from === "bot" ? "assistant" : "user",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        },
      );
      const botReply = res.data.choices[0].message.content.trim();
      setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {open && (
        <section
          className="chatbot-window"
          style={{
            left: position.x + 56,
            top: position.y,
            transform: "translate(-100%, -100%)",
          }}
        >
          <header className="chatbot-header">
            <span>Ella Tech Strategy Expert</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="chatbot-body">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.from}`}>
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <footer className="chatbot-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
            />
            <button onClick={sendMessage}>Send</button>
          </footer>
        </section>
      )}

      <button
        className="chatbot-toggle"
        style={{ left: position.x, top: position.y }}
        onMouseDown={onMouseDown}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        Chat
      </button>
    </>
  );
};

export default Chatbot;
