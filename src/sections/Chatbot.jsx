// src/sections/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const TOGGLE_SIZE = 60;
const DOCK_MARGIN = 16;
const DOCK_GAP = 12;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Ella Tech Solutions contact details
const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "";
const ETS_BOOKING_URL = SITE_URL ? `${SITE_URL}/#contact` : "#contact";
const ETS_PHONE = "(313) 474 1772";
const ETS_EMAIL = "info@ellatechsolutions.com";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

const BUSINESS_SYSTEM_PROMPT = `
You are the official Ella Tech Solutions website assistant.

Primary focus
Technology consulting, staff training, and ongoing technology support.

Additional services
Website development and redesign
Website maintenance and troubleshooting
Automation and digital workflows

Tone
Professional, clear, friendly, and confident.
You represent a real business, not a generic AI assistant.

Rules
1. Answer technology questions clearly and practically.
2. Lead with consulting, training, and support in recommendations whenever appropriate.
3. If the visitor asks to schedule, book, consult, pricing, quote, estimate, or wants hands on help, you must provide contact options and the scheduling link.
4. If the visitor asks how to contact the business, always provide phone, email, and scheduling link.
5. Never promise instant replies. State that Ella Tech Solutions replies within one business day.
6. Do not claim actions like booking or calling. Only provide directions and contact info.
7. Keep answers concise unless the visitor asks for more detail.

Official contact
Phone: (313) 474 1772
Email: info@ellatechsolutions.com
Scheduling: ${ETS_BOOKING_URL}
`;

const wantsSchedulingOrContact = (text) => {
  const t = (text || "").toLowerCase();
  const patterns = [
    "schedule",
    "book",
    "appointment",
    "consult",
    "consultation",
    "meeting",
    "call",
    "phone",
    "email",
    "contact",
    "quote",
    "pricing",
    "price",
    "estimate",
    "training",
    "workshop",
    "support",
    "help me",
    "can you do it",
    "can you build",
    "can you make",
    "can you fix",
  ];
  return patterns.some((p) => t.includes(p));
};

const contactCtaText = () =>
  `You can reach Ella Tech Solutions here. We reply within one business day.\n\n` +
  `Schedule a consultation: ${ETS_BOOKING_URL}\n` +
  `Phone: ${ETS_PHONE}\n` +
  `Email: ${ETS_EMAIL}`;

const Chatbot = () => {
  // State
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m the Ella Tech Strategy Expert. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Keep latest messages for correct history building
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Start DOCKED in bottom-right
  const [docked, setDocked] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Drag handlers
  const startDragFromPoint = (pageX, pageY) => {
    if (docked) {
      const left = window.innerWidth - (DOCK_MARGIN + TOGGLE_SIZE);
      const top = window.innerHeight - (DOCK_MARGIN + TOGGLE_SIZE);
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

  // Re-dock on viewport changes
  useEffect(() => {
    const reDock = () => {
      setDragging(false);
      setDocked(true);
    };

    window.addEventListener("resize", reDock);
    window.addEventListener("orientationchange", reDock);

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

  // Messaging helpers
  const buildChatHistory = (latestMessages, userText) => {
    const history = [
      { role: "system", content: BUSINESS_SYSTEM_PROMPT },
      ...latestMessages.map((m) => ({
        role: m.from === "bot" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: userText },
    ];

    const maxTurns = 14;
    const system = history[0];
    const rest = history.slice(1);
    const trimmed = rest.slice(Math.max(0, rest.length - maxTurns));
    return [system, ...trimmed];
  };

  const sendMessage = async (overrideText) => {
    const userText = (overrideText ?? input).trim();
    if (!userText) return;

    setMessages((msgs) => [...msgs, { from: "user", text: userText }]);
    setInput("");

    try {
      const history = buildChatHistory(messagesRef.current, userText);

      const res = await axios.post(
        CHAT_ENDPOINT,
        { messages: history },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let botReply = res?.data?.reply?.trim();
      if (!botReply) botReply = "Sorry, I did not get a response. Try again.";
      
      if (wantsSchedulingOrContact(userText)) {
        botReply = `${botReply}\n\n${contactCtaText()}`;
      } else {
        botReply =
          `${botReply}\n\nIf you want hands on help through tech consulting, staff training, or support:\n` +
          `${contactCtaText()}`;
      }

      setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: `Sorry, something went wrong.\n\n${contactCtaText()}` },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Styles for docked vs undocked
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

  const QuickActions = () => {
    const pill = {
      fontSize: 12,
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(0,0,0,0.18)",
      background: "#ffffff",
      color: "#111",
      textDecoration: "none",
      cursor: "pointer",
    };

    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <a href={ETS_BOOKING_URL} target="_blank" rel="noreferrer" style={pill}>
          Schedule
        </a>

        <a href={`tel:${ETS_PHONE}`} style={pill}>
          Call
        </a>

        <a href={`mailto:${ETS_EMAIL}`} style={pill}>
          Email
        </a>

        <button
          type="button"
          onClick={() => sendMessage("I want consulting. What is the best next step to schedule")}
          style={pill}
        >
          Tech consulting
        </button>

        <button
          type="button"
          onClick={() =>
            sendMessage("I want staff training. What training options do you recommend and how do I schedule")
          }
          style={pill}
        >
          Staff training
        </button>

        <button
          type="button"
          onClick={() =>
            sendMessage("I need ongoing tech support. How does support work and how do I get started")
          }
          style={pill}
        >
          Support
        </button>

        <button
          type="button"
          onClick={() => sendMessage("Can you give me an estimate or quote and tell me how to schedule")}
          style={pill}
        >
          Get a quote
        </button>
      </div>
    );
  };

  return (
    <>
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
            <QuickActions />

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
                  whiteSpace: "pre-wrap",
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
              onClick={() => sendMessage()}
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

