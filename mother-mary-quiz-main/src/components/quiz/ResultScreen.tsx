import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles as SparklesIcon } from "lucide-react";
import { Sparkles } from "./Sparkles";
import { SmartImage } from "./SmartImage";
import maryBlessing from "@/assets/mary-blessing.png";
import marySad from "@/assets/mary-sad.png";

export const ResultScreen = ({ score, total, onRestart }) => {
  const pct = Math.round((score / total) * 100);
  const passed = score > 10;

  return (
    <div className="w-full max-w-3xl mx-auto text-center animate-fade-in-up">
      <div className="relative mx-auto w-52 h-52 sm:w-72 sm:h-72 mb-6">
        {passed && (
          <>
            <div className="absolute inset-0 bg-halo animate-halo-pulse rounded-full scale-110" />
            <Sparkles count={18} />
          </>
        )}
        <SmartImage
          src={passed ? maryBlessing : marySad}
          alt={passed ? "Mother Mary blessing" : "Mother Mary in prayer"}
          eager
          width={288}
          height={288}
          className={`relative w-full h-full object-contain ${
            passed ? "animate-joyful-dance drop-shadow-[0_0_40px_hsl(45_95%_75%/0.8)]" : "animate-gentle-bob drop-shadow-[0_0_24px_hsl(215_70%_70%/0.4)]"
          }`}
        />
      </div>

      <p className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-accent-deep font-medium mb-2">
        <SparklesIcon className="h-3 w-3" /> Your Result <SparklesIcon className="h-3 w-3" />
      </p>

      <h2 className="font-serif text-5xl sm:text-6xl font-semibold mb-2">
        <span className="text-gradient-gold">{score}</span>
        <span className="text-muted-foreground/60"> / {total}</span>
      </h2>
      <p className="text-2xl font-serif text-primary-deep mb-1">{pct}%</p>
      <p className={`text-sm font-medium tracking-widest uppercase mb-6 ${passed ? "text-success" : "text-muted-foreground"}`}>
        {passed ? "✦ Blessed ✦" : "Continue your journey"}
      </p>

      <div className="max-w-lg mx-auto bg-card/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-card p-8 mb-8">
        <p className="font-serif text-2xl sm:text-3xl leading-snug text-primary-deep">
          {passed ? "“You are blessed. Well done!”" : "“Keep learning and growing in faith.”"}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {passed
            ? "Your knowledge of Our Lady shines like a star at sea. May her grace continue to guide you."
            : "Every step toward understanding is a step toward grace. Try again — Mary walks beside you."}
        </p>
      </div>

      <Button
        onClick={onRestart}
        size="lg"
        className="group h-14 px-10 rounded-full text-base font-medium bg-gradient-blue text-primary-foreground border-0 shadow-divine hover:shadow-glow-blue hover:scale-[1.04] active:scale-[0.97] transition-divine"
      >
        <RotateCcw className="h-4 w-4 mr-2 group-hover:-rotate-180 transition-transform duration-500" />
        Take the Quiz Again
      </Button>
    </div>
  );
};
