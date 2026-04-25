import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ChatbotMessage from "../features/chatbot/ChatbotMessage.jsx";
import QuickActions from "../features/chatbot/QuickActions.jsx";
import {
  BOOKING_ONLY_CTA,
  BUSINESS_SYSTEM_PROMPT,
  CHAT_ENDPOINT,
  CHATBOT_EVENT_MOBILE_MENU,
  DOCK_GAP,
  DOCK_MARGIN,
  INITIAL_MESSAGES,
  TOGGLE_SIZE,
} from "../features/chatbot/chatbotConfig.js";
import { chatbotGlowCss } from "../features/chatbot/chatbotStyles.js";
import {
  cleanBotText,
  contactReply,
  intentFromText,
  makeSpacing,
  serviceReply,
  userAskedForPhoneOrEmail,
} from "../features/chatbot/chatbotText.js";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function Chatbot() {
  const location = useLocation();
  const bottomRef = useRef(null);
  const messagesRef = useRef(INITIAL_MESSAGES);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [docked, setDocked] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

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

  useEffect(() => {
    const onMobileMenu = (event) => {
      if (event?.detail?.open) {
        setOpen(false);
        reDock();
      }
    };

    window.addEventListener(CHATBOT_EVENT_MOBILE_MENU, onMobileMenu);
    return () => window.removeEventListener(CHATBOT_EVENT_MOBILE_MENU, onMobileMenu);
  }, []);

  useEffect(() => {
    const onDocClickCapture = (event) => {
      if (event.target instanceof Element && event.target.closest("header")) {
        reDock();
      }
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

  const handleMouseDown = (event) => {
    event.preventDefault();
    startDragFromPoint(event.pageX, event.pageY);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (touch) startDragFromPoint(touch.pageX, touch.pageY);
  };

  useEffect(() => {
    const moveTo = (pageX, pageY) => {
      const x = pageX - rel.x;
      const y = pageY - rel.y;
      setPosition({
        x: clamp(x, 8, window.innerWidth - TOGGLE_SIZE - 8),
        y: clamp(y, 8, window.innerHeight - TOGGLE_SIZE - 8),
      });
    };

    const onMouseMove = (event) => {
      if (!dragging) return;
      event.preventDefault();
      moveTo(event.pageX, event.pageY);
    };

    const onTouchMove = (event) => {
      if (!dragging) return;
      const touch = event.touches[0];
      if (!touch) return;
      event.preventDefault();
      moveTo(touch.pageX, touch.pageY);
    };

    const stopDragging = () => {
      if (dragging) setDragging(false);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: false });
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", stopDragging);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [dragging, rel.x, rel.y]);

  useEffect(() => {
    const onResize = () => reDock();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener("resize", onResize);
      viewport.addEventListener("scroll", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (viewport) {
        viewport.removeEventListener("resize", onResize);
        viewport.removeEventListener("scroll", onResize);
      }
    };
  }, []);

  const buildChatHistory = (latestMessages, userText) => {
    const history = [
      { role: "system", content: BUSINESS_SYSTEM_PROMPT },
      ...latestMessages.map((message) => ({
        role: message.from === "bot" ? "assistant" : "user",
        content: message.text,
      })),
      { role: "user", content: userText },
    ];

    const maxTurns = 14;
    return [history[0], ...history.slice(1).slice(-maxTurns)];
  };

  const pushBot = (raw) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { from: "bot", text: cleanBotText(raw) },
    ]);
  };

  const sendMessage = async (overrideText) => {
    const userText = (overrideText ?? input).trim();
    if (!userText) return;

    setMessages((currentMessages) => [...currentMessages, { from: "user", text: userText }]);
    setInput("");

    if (userAskedForPhoneOrEmail(userText)) {
      pushBot(contactReply());
      return;
    }

    const intent = intentFromText(userText);
    if (intent) {
      pushBot(serviceReply(intent));
      return;
    }

    try {
      const response = await axios.post(
        CHAT_ENDPOINT,
        { messages: buildChatHistory(messagesRef.current, userText) },
        { headers: { "Content-Type": "application/json" } }
      );

      const botReply = response?.data?.reply?.trim() || "Sorry, I did not get a response. Please try again.";
      pushBot(makeSpacing(`${botReply}\n\n${BOOKING_ONLY_CTA}`));
    } catch {
      pushBot(makeSpacing(`Sorry, something went wrong on our side.\n\n${BOOKING_ONLY_CTA}`));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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

  return (
    <>
      <style>{chatbotGlowCss}</style>

      {open ? (
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
          aria-label="Ella Tech chat"
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
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <span>Ella Tech Strategy Expert</span>

            <button
              type="button"
              aria-label="Close chat"
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onTouchStart={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
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
              x
            </button>
          </header>

          <div
            className="chatbot-body"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 12,
              background: "#f9f9f9",
            }}
          >
            <QuickActions onSelect={sendMessage} />

            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}-${message.text.slice(0, 16)}`}
                className={`message ${message.from}`}
                style={{
                  marginBottom: 8,
                  alignSelf: message.from === "bot" ? "flex-start" : "flex-end",
                  background: message.from === "bot" ? "#e1f5fe" : "#c8e6c9",
                  padding: "8px 10px",
                  borderRadius: 6,
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                <ChatbotMessage message={message} />
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
            <label htmlFor="chatbot-input" className="sr-only">
              Message
            </label>
            <input
              id="chatbot-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
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
      ) : null}

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
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        Chat
      </button>
    </>
  );
}

export default Chatbot;
