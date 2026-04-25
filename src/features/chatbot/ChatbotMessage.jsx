import { ETS_BOOKING_URL, ETS_EMAIL, ETS_PHONE } from "./chatbotConfig.js";
import { linkStyle } from "./chatbotStyles.js";
import { cleanBotText, normalizeTel } from "./chatbotText.js";

function renderInlineLinks(line) {
  const phoneIndex = line.indexOf(ETS_PHONE);
  const emailIndex = line.indexOf(ETS_EMAIL);

  if (phoneIndex === -1 && emailIndex === -1) return <span>{line}</span>;

  const nextIsPhone = phoneIndex !== -1 && (emailIndex === -1 || phoneIndex < emailIndex);
  const index = nextIsPhone ? phoneIndex : emailIndex;
  const match = nextIsPhone ? ETS_PHONE : ETS_EMAIL;
  const before = line.slice(0, index);
  const after = line.slice(index + match.length);

  return (
    <>
      {before ? <span>{before}</span> : null}
      {nextIsPhone ? (
        <a href={`tel:${normalizeTel(ETS_PHONE)}`} style={linkStyle}>
          {ETS_PHONE}
        </a>
      ) : (
        <a href={`mailto:${ETS_EMAIL}`} style={linkStyle}>
          {ETS_EMAIL}
        </a>
      )}
      {after ? <span>{after}</span> : null}
    </>
  );
}

function ChatbotMessage({ message }) {
  if (message.from !== "bot") {
    return <div style={{ whiteSpace: "pre-wrap" }}>{message.text}</div>;
  }

  const lines = cleanBotText(message.text).split("\n");

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        const key = `${index}-${trimmed}`;

        if (!trimmed) return <div key={key} style={{ height: 10 }} />;
        if (trimmed === "#contact") return <div key={key} />;

        if (trimmed.includes("[[ETS_BOOK]]")) {
          return (
            <div key={key}>
              Next step:{" "}
              <a href={ETS_BOOKING_URL} style={linkStyle}>
                Book a free consultation
              </a>
            </div>
          );
        }

        if (trimmed.includes("[[ETS_PHONE]]")) {
          return (
            <div key={key}>
              Phone:{" "}
              <a href={`tel:${normalizeTel(ETS_PHONE)}`} style={linkStyle}>
                {ETS_PHONE}
              </a>
            </div>
          );
        }

        if (trimmed.includes("[[ETS_EMAIL]]")) {
          return (
            <div key={key}>
              Email:{" "}
              <a href={`mailto:${ETS_EMAIL}`} style={linkStyle}>
                {ETS_EMAIL}
              </a>
            </div>
          );
        }

        return <div key={key}>{renderInlineLinks(line)}</div>;
      })}
    </div>
  );
}

export default ChatbotMessage;
