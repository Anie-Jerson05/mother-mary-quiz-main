import { useMemo } from "react";

export const Sparkles = ({ count = 14 }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 1.2,
        size: 6 + Math.random() * 10,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((s) => (
        <span
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, hsl(45 100% 80%), transparent 70%)",
            borderRadius: "50%",
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 8px hsl(45 95% 70%)",
          }}
        />
      ))}
    </div>
  );
};
