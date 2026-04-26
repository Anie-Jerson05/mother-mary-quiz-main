import { useEffect, useState } from "react";
import { Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_PER_Q = 25;

export const QuestionCard = ({ question, index, total, onAnswer, onSkip }) => {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [time, setTime] = useState(TIME_PER_Q);

  useEffect(() => {
    setSelected(null);
    setLocked(false);
    setTime(TIME_PER_Q);
  }, [question]);

  useEffect(() => {
    if (locked) return;
    if (time <= 0) {
      if (selected === null) {
        setSelected(null);
        setLocked(false);
        onSkip();
        return;
      }
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time, locked, selected, onSkip]);

  const handlePick = (i) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    const correct = i === question.answer;
    setTimeout(() => onAnswer(correct), 1100);
  };

  const progress = ((index + 1) / total) * 100;
  const timePct = (time / TIME_PER_Q) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto animate-scale-in">
      {/* Header: progress + timer */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="font-medium text-primary-deep tracking-wide">
          Question <span className="text-accent-deep">{index + 1}</span> of {total}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-mono font-medium px-3 py-1 rounded-full bg-card/80 backdrop-blur border transition-divine",
            time <= 5 ? "border-destructive/50 text-destructive animate-wrong-shake" : "border-accent/30 text-accent-deep"
          )}
        >
          <Clock className="h-3.5 w-3.5" />
          {time}s
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-1">
        <div
          className="h-full bg-gradient-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="h-1 rounded-full bg-secondary/60 overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-blue transition-all duration-1000 ease-linear"
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Card */}
      <div className="relative bg-card/90 backdrop-blur-xl rounded-3xl shadow-card border border-white/60 p-5 sm:p-10">
        <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        <h2 className="font-serif text-xl sm:text-3xl leading-snug text-primary-deep mb-6 sm:mb-7">
          {question.q}
        </h2>

        <div className="grid gap-3">
          {question.options.map((opt, i) => {
            const hasSelection = selected !== null;
            const isCorrect = locked && hasSelection && i === question.answer;
            const isWrongPick = locked && hasSelection && selected === i && i !== question.answer;
            const isSelected = selected === i;

            return (
              <button
                key={i}
                onClick={() => handlePick(i)}
                disabled={locked}
                className={cn(
                  "group relative w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border-2 bg-card transition-divine touch-manipulation min-h-[56px]",
                  "flex items-center gap-3 sm:gap-4",
                  !locked && "border-border hover:border-accent hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
                  locked && !isCorrect && !isWrongPick && "border-border opacity-50",
                  isCorrect && "border-success bg-success/5 animate-correct-pop",
                  isWrongPick && "border-destructive bg-destructive/5 animate-wrong-shake",
                  isSelected && !locked && "border-accent"
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-serif font-semibold text-sm border-2 transition-divine",
                    !locked && "border-primary/20 text-primary-deep group-hover:border-accent group-hover:bg-gradient-gold group-hover:text-accent-foreground group-hover:scale-110",
                    isCorrect && "border-success bg-success text-success-foreground",
                    isWrongPick && "border-destructive bg-destructive text-destructive-foreground"
                  )}
                >
                  {isCorrect ? <Check className="h-4 w-4" /> : isWrongPick ? <X className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium text-foreground text-sm sm:text-lg leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
