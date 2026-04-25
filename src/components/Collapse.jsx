function Collapse({ open, children }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="pt-2">{children}</div>
    </div>
  );
}

export default Collapse;
