import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles as SparklesIcon } from "lucide-react";
import maryBlessing from "@/assets/mary-blessing.png";
import { SmartImage } from "./SmartImage";
import { preloadMaryImages } from "@/lib/preload";

export const StartScreen = ({ onStart }) => {
  useEffect(() => {
    preloadMaryImages();
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center animate-fade-in-up px-2">
      <div className="relative mx-auto w-44 h-44 sm:w-64 sm:h-64 mb-6">
        <div className="absolute inset-0 bg-halo animate-halo-pulse rounded-full" />
        <SmartImage
          src={maryBlessing}
          alt="Mother Mary"
          eager
          width={256}
          height={256}
          className="relative w-full h-full object-contain animate-gentle-bob drop-shadow-[0_0_30px_hsl(215_85%_70%/0.5)]"
        />
      </div>

      <p className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-accent-deep font-medium mb-3">
        <SparklesIcon className="h-3.5 w-3.5" /> A Sacred Journey <SparklesIcon className="h-3.5 w-3.5" />
      </p>
      <h1 className="font-serif text-4xl sm:text-7xl font-semibold leading-[1.05] mb-4">
        <span className="text-gradient-blue">Mother Mary</span>
        <br />
        <span className="text-gradient-gold">Quiz</span>
      </h1>
      <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 px-2">
        Twenty thoughtful questions on history, theology, traditions, and symbolism — drawn fresh and shuffled with each visit.
      </p>

      <Button
        onClick={onStart}
        size="lg"
        className="group relative h-14 px-10 rounded-full text-base font-medium bg-gradient-gold text-accent-foreground border-0 shadow-divine hover:shadow-glow-gold hover:scale-[1.04] active:scale-[0.97] transition-divine"
      >
        <span className="relative z-10">Begin the Quiz</span>
      </Button>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
        <span>✦ 20 Questions</span>
        <span>✦ Multiple Choice</span>
        <span>✦ Timed Reflection</span>
      </div>
    </div>
  );
};
