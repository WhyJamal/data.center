export const Loading = ({ text = "Загрузка" }: { text?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
    <span style={{ fontSize: 15, color: "#90a1b9" }}>{text}</span>

    <span style={dotStyle(0)}>.</span>
    <span style={dotStyle(0.2)}>.</span>
    <span style={dotStyle(0.4)}>.</span>

    <style>
      {`
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}
    </style>
  </div>
);

const dotStyle = (delay: number): React.CSSProperties => ({
  fontSize: 18,
  color: "#90a1b9",
  animation: "blink 1.4s infinite",
  animationDelay: `${delay}s`,
});