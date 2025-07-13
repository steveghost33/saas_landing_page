// src/sections/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  // ─────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m the Ella Tech Strategy Expert. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Dragging‐and‐position state
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // Scroll to bottom whenever messages change
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─────────────────────────────────────────────────────────────
  // Handle mousemove / mouseup for drag
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging) return;
      setPosition({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    };

    const onMouseUp = () => {
      if (dragging) {
        setDragging(false);
        setHasDragged(true);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  // ─────────────────────────────────────────────────────────────
  // Keep bottom‐right on resize (only if user hasn't dragged)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (!hasDragged) {
        setPosition({
          x: window.innerWidth - 80,
          y: window.innerHeight - 80,
        });
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [hasDragged]);

  // ─────────────────────────────────────────────────────────────
  // When user clicks down on the toggle, begin dragging
  // ─────────────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    setDragging(true);
    setRel({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.preventDefault();
  };

  // ─────────────────────────────────────────────────────────────
  // Sending a message
  // ─────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    const userText = input;
    setInput("");

    try {
      // Build OpenAI‐style history
      const history = messages.map((m) => ({
        role: m.from === "bot" ? "assistant" : "user",
        content: m.text,
      }));
      history.push({ role: "user", content: userText });

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: import.meta.env.VITE_OPENAI_MODEL,
          messages: history,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
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
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      {open && (
        <section
          className="chatbot-window"
          style={{
            position: "fixed",
            // We want the chat window’s bottom‐right corner to sit at (position.x + 56, position.y)
            left: position.x + 56,
            top: position.y,
            transform: "translate(-100%, -100%)",
            width: "300px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          <header
            className="chatbot-header"
            style={{
              padding: "8px 12px",
              background: "#0077cc",
              color: "#fff",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "move",
            }}
            // If user drags from header, it should also start dragging
            onMouseDown={onMouseDown}
          >
            <span>Ella Tech Strategy Expert</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "20px",
                lineHeight: "1",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </header>

          <div
            className="chatbot-body"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              background: "#f9f9f9",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.from}`}
                style={{
                  marginBottom: "8px",
                  alignSelf: m.from === "bot" ? "flex-start" : "flex-end",
                  background: m.from === "bot" ? "#e1f5fe" : "#c8e6c9",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <footer
            className="chatbot-footer"
            style={{
              padding: "8px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              style={{
                flex: 1,
                padding: "6px 8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#0077cc",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Send
            </button>
          </footer>
        </section>
      )}

      <button
        className="chatbot-toggle"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#0077cc",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          userSelect: "none",
        }}
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