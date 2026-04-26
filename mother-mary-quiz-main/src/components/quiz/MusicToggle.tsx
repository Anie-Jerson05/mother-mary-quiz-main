import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

// Soft instrumental loop (royalty-free, calm pad/strings)
const HYMN_URL = "src/assets/vidssave.com Salve Regina _ Traditional Latin Hymn (Official Lyric Music Video) - Francesca LaRosa LOW.mp3";

export const MusicToggle = () => {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio();
    a.src = HYMN_URL;
    a.loop = true;
    a.volume = 0.22;
    a.preload = "auto";
    a.crossOrigin = "anonymous";
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.play().then(() => setOn(true)).catch(() => setOn(false));
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={on ? "Mute music" : "Play music"}
      className="rounded-full bg-card/80 backdrop-blur border-accent/30 hover:border-accent hover:shadow-glow-gold transition-divine"
    >
      {on ? <Volume2 className="h-4 w-4 text-accent-deep" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
    </Button>
  );
};
