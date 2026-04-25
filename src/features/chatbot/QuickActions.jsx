import { ETS_BOOKING_URL, QUICK_ACTIONS } from "./chatbotConfig.js";
import { quickActionStyle } from "./chatbotStyles.js";

function QuickActions({ onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action}
          type="button"
          onClick={() => onSelect(action)}
          style={quickActionStyle}
        >
          {action}
        </button>
      ))}
      <a href={ETS_BOOKING_URL} style={quickActionStyle}>
        Book a consultation
      </a>
    </div>
  );
}

export default QuickActions;

