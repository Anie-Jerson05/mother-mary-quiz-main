import { useMemo } from "react";

export const Particles = ({ count = 18 }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 10,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        gold: Math.random() > 0.5,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float-up blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.gold
              ? "radial-gradient(circle, hsl(45 95% 75%), hsl(43 80% 55% / 0))"
              : "radial-gradient(circle, hsl(215 90% 85%), hsl(218 70% 60% / 0))",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
