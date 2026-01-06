// src/sections/Chatbot.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TOGGLE_SIZE = 60;
const DOCK_MARGIN = 16;
const DOCK_GAP = 12;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

// Ella Tech Solutions contact details
const ETS_BOOKING_URL = "#contact"; // do not print this as plain text anywhere
const ETS_PHONE = "(313) 474 1772";
const ETS_EMAIL = "info@ellatechsolutions.com";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat`;

const normalizeTel = (phone) => {
  const digitsOnly = String(phone || "").replace(/[^\d]/g, "");
  if (!digitsOnly) return "";
  return digitsOnly.length === 10 ? `+1${digitsOnly}` : `+${digitsOnly}`;
};

const makeSpacing = (text) => {
  let t = String(text || "");
  t = t.replace(/\n{3,}/g, "\n\n").trim();
  return t;
};

const stripContactArtifacts = (text) => {
  let t = String(text || "");
  t = t.replace(/^\s*#contact\s*$/gim, "");
  t = t.replace(/https?:\/\/\S*#contact\b/gi, "");
  t = t.replace(/\s#contact\b/gi, "");
  t = t.replace(/#contact\b/gi, "");
  t = t.replace(/\n{3,}/g, "\n\n").trim();
  return t;
};

const stripChatgptArtifacts = (text) => {
  let t = String(text || "");
  t = t.replace(/https?:\/\/(?:chat\.openai\.com|chatgpt\.com)\S*/gi, "");
  t = t.replace(/\bChatGPT\b/gi, "this assistant");
  t = t.replace(/\bOpenAI\b/gi, "");
  t = t.replace(/\bGPT\b/gi, "");
  t = t.replace(/\(\s*\)/g, "");
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/\n{3,}/g, "\n\n").trim();
  return t;
};

const ensureQuestionMarks = (text) => {
  const lines = String(text || "").split("\n");
  const fixed = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    const looksLikeQuestion =
      /^(what|which|who|when|where|why|how|do you|are you|can you|could you|would you|is it|are there|does|did)\b/i.test(
        trimmed
      );

    const alreadyHasQ = trimmed.endsWith("?");
    const endsWithPunct = /[.:]$/.test(trimmed);

    if (looksLikeQuestion && !alreadyHasQ && !endsWithPunct) return `${trimmed}?`;
    return line;
  });

  return fixed.join("\n");
};

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
1. Keep answers short, clear, and action oriented.
2. When the visitor asks about Support, Tech Consulting, or Staff Training, include a few plain language details about what that service includes.
3. After describing the service, route them to book a free 30 minute consultation.
4. Only provide phone and email if the visitor asks for phone, call, email, or contact info.
5. Never promise instant replies. State that Ella Tech Solutions replies within one business day.
6. Never mention ChatGPT, OpenAI, GPT, or any external AI brand. Never include links to any AI site.

Official contact
Phone: (313) 474 1772
Email: info@ellatechsolutions.com
Scheduling: Use the website contact section to book a free 30 minute consultation.
`;

const BOOKING_ONLY_CTA = `Next step: [[ETS_BOOK]]`;
const CONTACT_ONLY_CTA = `Phone: [[ETS_PHONE]]\nEmail: [[ETS_EMAIL]]\n\nElla Tech Solutions replies within one business day.`;

const norm = (s) => String(s || "").toLowerCase().trim();
const containsAny = (t, arr) => arr.some((p) => t.includes(p));

const userAskedForPhoneOrEmail = (text) => {
  const t = norm(text);
  return containsAny(t, [
    "phone",
    "call",
    "telephone",
    "number",
    "email",
    "e-mail",
    "contact",
    "reach you",
    "reach out",
    "how do i contact",
    "how can i contact",
  ]);
};

const intentFromText = (text) => {
  const t = norm(text);

  const hasTraining =
    t.includes("staff training") ||
    (t.includes("training") && !t.includes("strength training")) ||
    t.includes("workshop");

  const hasConsulting =
    t.includes("tech consulting") ||
    t.includes("technology consulting") ||
    t.includes("consulting") ||
    t.includes("consultant");

  const hasSupport =
    t.includes("support") ||
    t.includes("help desk") ||
    t.includes("troubleshoot") ||
    t.includes("ongoing help") ||
    t.includes("it help") ||
    t.includes("fix") ||
    t.includes("broken");

  const hasQuote =
    t.includes("get a quote") ||
    t.includes("quote") ||
    t.includes("estimate") ||
    t.includes("pricing") ||
    t.includes("cost") ||
    t.includes("how much");

  if (hasTraining) return "staff_training";
  if (hasConsulting) return "tech_consulting";
  if (hasSupport) return "support";
  if (hasQuote) return "get_quote";
  return "";
};

const serviceReply = (intent) => {
  if (intent === "tech_consulting") {
    return makeSpacing(
      `Tech consulting helps you make smart decisions and fix problems without guessing.\n\n` +
        `What it can include:\n` +
        `1. Review your current setup and goals\n` +
        `2. Recommend tools, workflows, and next steps\n` +
        `3. Create a plan and provide hands on implementation if needed\n\n` +
        `${BOOKING_ONLY_CTA}`
    );
  }

  if (intent === "staff_training") {
    return makeSpacing(
      `Staff training helps your team use the tools correctly and consistently.\n\n` +
        `What it can include:\n` +
        `1. Live sessions tailored to your roles\n` +
        `2. Simple guides and walkthroughs your team can reuse\n` +
        `3. Practice time, Q and A, and follow up support\n\n` +
        `${BOOKING_ONLY_CTA}`
    );
  }

  if (intent === "support") {
    return makeSpacing(
      `Support helps you troubleshoot issues and keep your technology running reliably.\n\n` +
        `What it can include:\n` +
        `1. Diagnose the problem and stabilize the issue\n` +
        `2. Fixes for accounts, email, Microsoft 365, devices, and websites\n` +
        `3. Ongoing support options if you need a long term partner\n\n` +
        `${BOOKING_ONLY_CTA}`
    );
  }

  if (intent === "get_quote") {
    return makeSpacing(
      `Quotes depend on scope, timeline, and what you want done.\n\n` +
        `What we confirm during a consultation:\n` +
        `1. Your goal and what success looks like\n` +
        `2. The work required and recommended approach\n` +
        `3. Timeline and a clear price range or quote\n\n` +
        `${BOOKING_ONLY_CTA}`
    );
  }

  return "";
};

const Chatbot = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m the Ella Tech Strategy Expert. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [docked, setDocked] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const reDock = () => {
    setDragging(false);
    setDocked(true);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    reDock();
  }, [location.pathname, location.hash]);

  // Close chat when mobile menu opens
  useEffect(() => {
    const onMobileMenu = (e) => {
      const shouldClose = Boolean(e?.detail?.open);
      if (shouldClose) {
        setOpen(false);
        reDock();
      }
    };

    window.addEventListener("ets:mobileMenu", onMobileMenu);
    return () => window.removeEventListener("ets:mobileMenu", onMobileMenu);
  }, []);

  useEffect(() => {
    const onDocClickCapture = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const headerEl = target.closest("header");
      if (headerEl) reDock();
    };

    document.addEventListener("click", onDocClickCapture, true);
    return () => document.removeEventListener("click", onDocClickCapture, true);
  }, []);

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
  }, [dragging, rel, position.x, position.y]);

  useEffect(() => {
    const onResize = () => reDock();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", onResize);
      vv.addEventListener("scroll", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (vv) {
        vv.removeEventListener("resize", onResize);
        vv.removeEventListener("scroll", onResize);
      }
    };
  }, []);

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

  const pushBot = (raw) => {
    const cleaned = makeSpacing(
      ensureQuestionMarks(stripChatgptArtifacts(stripContactArtifacts(raw)))
    );
    setMessages((msgs) => [...msgs, { from: "bot", text: cleaned }]);
  };

  const sendMessage = async (overrideText) => {
    const userText = (overrideText ?? input).trim();
    if (!userText) return;

    setMessages((msgs) => [...msgs, { from: "user", text: userText }]);
    setInput("");

    if (userAskedForPhoneOrEmail(userText)) {
      pushBot(makeSpacing(`${CONTACT_ONLY_CTA}`));
      return;
    }

    const intent = intentFromText(userText);
    if (intent) {
      pushBot(serviceReply(intent));
      return;
    }

    try {
      const history = buildChatHistory(messagesRef.current, userText);

      const res = await axios.post(
        CHAT_ENDPOINT,
        { messages: history },
        { headers: { "Content-Type": "application/json" } }
      );

      let botReply = res?.data?.reply?.trim();
      if (!botReply) botReply = "Sorry, I did not get a response. Please try again.";

      botReply = makeSpacing(`${botReply}\n\n${BOOKING_ONLY_CTA}`);
      pushBot(botReply);
    } catch (err) {
      console.error("Chatbot error:", err);
      pushBot(makeSpacing(`Sorry, something went wrong on our side.\n\n${BOOKING_ONLY_CTA}`));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

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
        <button type="button" onClick={() => sendMessage("Tech consulting")} style={pill}>
          Tech consulting
        </button>
        <button type="button" onClick={() => sendMessage("Staff training")} style={pill}>
          Staff training
        </button>
        <button type="button" onClick={() => sendMessage("Support")} style={pill}>
          Support
        </button>
        <button type="button" onClick={() => sendMessage("Get a quote")} style={pill}>
          Get a quote
        </button>
        <a href={ETS_BOOKING_URL} style={pill}>
          Book a consultation
        </a>
      </div>
    );
  };

  const renderBotText = (text) => {
    const safe = makeSpacing(
      ensureQuestionMarks(stripChatgptArtifacts(stripContactArtifacts(text)))
    );

    const linkStyle = {
      color: "#0b5ed7",
      textDecoration: "underline",
      fontWeight: 700,
    };

    const lines = safe.split("\n");

    const renderInlineLinks = (line) => {
      const tokens = [];
      let remaining = line;

      const phoneIndex = remaining.indexOf(ETS_PHONE);
      const emailIndex = remaining.indexOf(ETS_EMAIL);

      if (phoneIndex === -1 && emailIndex === -1) return <span>{line}</span>;

      const nextIsPhone = phoneIndex !== -1 && (emailIndex === -1 || phoneIndex < emailIndex);
      const idx = nextIsPhone ? phoneIndex : emailIndex;
      const match = nextIsPhone ? ETS_PHONE : ETS_EMAIL;

      const before = remaining.slice(0, idx);
      const after = remaining.slice(idx + match.length);

      if (before) tokens.push(<span key="b">{before}</span>);

      if (nextIsPhone) {
        tokens.push(
          <a key="p" href={`tel:${normalizeTel(ETS_PHONE)}`} style={linkStyle}>
            {ETS_PHONE}
          </a>
        );
      } else {
        tokens.push(
          <a key="e" href={`mailto:${ETS_EMAIL}`} style={linkStyle}>
            {ETS_EMAIL}
          </a>
        );
      }

      if (after) tokens.push(<span key="a">{after}</span>);

      return <>{tokens}</>;
    };

    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} style={{ height: 10 }} />;

          if (trimmed.includes("[[ETS_BOOK]]")) {
            return (
              <div key={idx}>
                Next step:{" "}
                <a href={ETS_BOOKING_URL} style={linkStyle}>
                  Book a free consultation
                </a>
              </div>
            );
          }

          if (trimmed.includes("[[ETS_PHONE]]")) {
            return (
              <div key={idx}>
                Phone:{" "}
                <a href={`tel:${normalizeTel(ETS_PHONE)}`} style={linkStyle}>
                  {ETS_PHONE}
                </a>
              </div>
            );
          }

          if (trimmed.includes("[[ETS_EMAIL]]")) {
            return (
              <div key={idx}>
                Email:{" "}
                <a href={`mailto:${ETS_EMAIL}`} style={linkStyle}>
                  {ETS_EMAIL}
                </a>
              </div>
            );
          }

          if (trimmed === "#contact") return <div key={idx} />;

          return <div key={idx}>{renderInlineLinks(line)}</div>;
        })}
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
              type="button"
              aria-label="Close chat"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 20,
                lineHeight: 1,
                cursor: "pointer",
                padding: 0,
                marginLeft: 12,
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
                }}
              >
                {m.from === "bot" ? (
                  renderBotText(m.text)
                ) : (
                  <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                )}
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
              type="button"
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
        type="button"
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
