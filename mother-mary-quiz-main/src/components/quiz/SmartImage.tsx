import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Image with built-in skeleton shimmer + lazy loading.
 * Prevents blank space while large PNGs decode.
 */
export const SmartImage = ({ src, alt, eager, className, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block w-full h-full">
      {!loaded && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...rest}
      />
    </span>
  );
};
