export const quickActionStyle = {
  fontSize: 12,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.18)",
  background: "#ffffff",
  color: "#111",
  textDecoration: "none",
  cursor: "pointer",
};

export const linkStyle = {
  color: "#0b5ed7",
  textDecoration: "underline",
  fontWeight: 700,
};

export const chatbotGlowCss = `
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
`;

