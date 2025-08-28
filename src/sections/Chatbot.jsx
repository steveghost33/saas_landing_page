// src/sections/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const TOGGLE_SIZE = 60;      // px
const DOCK_MARGIN = 16;      // px from edges when docked
const DOCK_GAP = 12;         // px gap between toggle and window when docked

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

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

  // Start DOCKED in bottom-right; undock only after a drag starts
  const [docked, setDocked] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // used when undocked
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  // ─────────────────────────────────────────────────────────────
  // Auto-scroll to latest message
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─────────────────────────────────────────────────────────────
  // Drag handlers (mouse + touch)
  // ─────────────────────────────────────────────────────────────
  const startDragFromPoint = (pageX, pageY) => {
    if (docked) {
      const left = window.innerWidth - (DOCK_MARGIN + TOGGLE_SIZE);
      const top  = window.innerHeight - (DOCK_MARGIN + TOGGLE_SIZE);
      setPosition({ x: left, y: top });
      setDocked(false);
      setRel({ x: pageX - left, y: pageY - top });
    } else {
      setRel({ x: pageX - position.x, y: pageY - position.y });
    }
    setDragging(true);
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    startDragFromPoint(e.pageX, e.pageY);
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    if (!t) return;
    startDragFromPoint(t.pageX, t.pageY);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      const x = e.pageX - rel.x;
      const y = e.pageY - rel.y;
      setPosition({
        x: clamp(x, 8, window.innerWidth - TOGGLE_SIZE - 8),
        y: clamp(y, 8, window.innerHeight - TOGGLE_SIZE - 8),
      });
    };
    const onMouseUp = () => {
      if (dragging) setDragging(false);
    };

    const onTouchMove = (e) => {
      if (!dragging) return;
      const t = e.touches[0];
      if (!t) return;
      e.preventDefault();
      const x = t.pageX - rel.x;
      const y = t.pageY - rel.y;
      setPosition({
        x: clamp(x, 8, window.innerWidth - TOGGLE_SIZE - 8),
        y: clamp(y, 8, window.innerHeight - TOGGLE_SIZE - 8),
      });
    };
    const onTouchEnd = () => {
      if (dragging) setDragging(false);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: false });
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging, rel]);

  // ─────────────────────────────────────────────────────────────
  // Always re-dock to bottom-right on any viewport size change
  // (desktop resize, mobile orientation, address bar show/hide)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const reDock = () => {
      setDragging(false);
      setDocked(true); // CSS right/bottom take over -> stays bottom-right
    };

    window.addEventListener("resize", reDock);
    window.addEventListener("orientationchange", reDock);

    // VisualViewport handles mobile chrome/safari UI expanding/collapsing
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", reDock);
      vv.addEventListener("scroll", reDock);
    }

    return () => {
      window.removeEventListener("resize", reDock);
      window.removeEventListener("orientationchange", reDock);
      if (vv) {
        vv.removeEventListener("resize", reDock);
        vv.removeEventListener("scroll", reDock);
      }
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Messaging
  // ─────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    const userText = input;
    setInput("");

    try {
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
    if (e.key === "Enter") sendMessage();
  };

  // ─────────────────────────────────────────────────────────────
  // Computed styles for docked vs undocked
  // ─────────────────────────────────────────────────────────────
  const toggleStyle = docked
    ? {
        position: "fixed",
        right: `calc(${DOCK_MARGIN}px + env(safe-area-inset-right, 0px))`,
        bottom: `calc(${DOCK_MARGIN}px + env(safe-area-inset-bottom, 0px))`,
      }
    : {
        position: "fixed",
        left: position.x,
        top: position.y,
      };

  const windowStyle =
    open &&
    (docked
      ? {
          position: "fixed",
          right: `calc(${DOCK_MARGIN}px + env(safe-area-inset-right, 0px))`,
          bottom: `calc(${DOCK_MARGIN + TOGGLE_SIZE + DOCK_GAP}px + env(safe-area-inset-bottom, 0px))`,
          width: "min(360px, calc(100vw - 32px))",
          maxHeight: "min(60vh, 480px)",
        }
      : {
          position: "fixed",
          left: position.x + TOGGLE_SIZE,
          top: position.y,
          transform: "translate(-100%, -100%)",
          width: "min(360px, calc(100vw - 32px))",
          maxHeight: "min(60vh, 480px)",
        });

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* Button glow styles (tweak rgba color to match your brand glow) */}
      <style>{`
        .chatbot-glow {
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.08),
            0 10px 28px rgba(0,119,204,0.45),
            0 0 24px rgba(0,119,204,0.35);
          transition: box-shadow .25s ease, transform .25s ease, background-color .25s ease;
        }
        .chatbot-glow:hover,
        .chatbot-glow:focus-visible {
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.12),
            0 14px 36px rgba(0,119,204,0.6),
            0 0 36px rgba(0,119,204,0.5);
          transform: translateY(-1px);
        }
        .chatbot-glow:active {
          transform: translateY(0);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.10),
            0 8px 22px rgba(0,119,204,0.45),
            0 0 24px rgba(0,119,204,0.45);
        }
        @media (prefers-reduced-motion: reduce) {
          .chatbot-glow { transition: none; }
        }
      `}</style>

      {open && (
        <section
          className="chatbot-window"
          style={{
            ...windowStyle,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <header
            className="chatbot-header"
            style={{
              padding: "8px 12px",
              background: "#0077cc",
              color: "#fff",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "move",
              touchAction: "none",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <span>Ella Tech Strategy Expert</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 20,
                lineHeight: 1,
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
              padding: 12,
              background: "#f9f9f9",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.from}`}
                style={{
                  marginBottom: 8,
                  alignSelf: m.from === "bot" ? "flex-start" : "flex-end",
                  background: m.from === "bot" ? "#e1f5fe" : "#c8e6c9",
                  padding: "8px 10px",
                  borderRadius: 6,
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
              padding: 8,
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: 8,
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
                borderRadius: 4,
                fontSize: 14,
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#0077cc",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Send
            </button>
          </footer>
        </section>
      )}

      <button
        className="chatbot-toggle chatbot-glow"
        style={{
          ...toggleStyle,
          width: TOGGLE_SIZE,
          height: TOGGLE_SIZE,
          borderRadius: "50%",
          background: "#0077cc",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          userSelect: "none",
          touchAction: "none",
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        Chat
      </button>
    </>
  );
};

export default Chatbot;

