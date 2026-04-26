import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { Particles } from "@/components/quiz/Particles";
import { MusicToggle } from "@/components/quiz/MusicToggle";
import { StartScreen } from "@/components/quiz/StartScreen";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ResultScreen } from "@/components/quiz/ResultScreen";
import { CorrectBurst } from "@/components/quiz/CorrectBurst";

const QUIZ_LENGTH = 20;

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Index = () => {
  const [phase, setPhase] = useState("start");
  const [seed, setSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [burst, setBurst] = useState(false);

  const questions = useMemo(
    () => shuffle(QUESTIONS).slice(0, QUIZ_LENGTH).map((q) => {
      // shuffle option order, but track new answer index
      const pairs = q.options.map((opt, i) => ({ opt, correct: i === q.answer }));
      const shuffled = shuffle(pairs);
      return {
        q: q.q,
        options: shuffled.map((p) => p.opt),
        answer: shuffled.findIndex((p) => p.correct),
      };
    }),
    [seed]
  );

  useEffect(() => {
    document.title = "Mother Mary Quiz · A Sacred Journey of 20 Questions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Take a beautifully designed Mother Mary quiz — 20 thoughtful questions on Marian theology, history, traditions, and symbolism.");
  }, []);

  const start = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setScore(0);
    setPhase("playing");
  };

  const handleAnswer = (correct) => {
    if (correct) {
      setScore((s) => s + 1);
      setBurst(true);
      setTimeout(() => setBurst(false), 1300);
    }
    setTimeout(() => {
      if (index + 1 >= questions.length) {
        setPhase("result");
      } else {
        setIndex((i) => i + 1);
      }
    }, correct ? 1100 : 200);
  };

  const handleSkip = () => {
    setBurst(false);
    if (index + 1 >= questions.length) {
      setPhase("result");
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-celestial">
      <Particles count={22} />

      {/* Decorative halo glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-accent-glow/20 blur-3xl" />

      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="font-serif text-lg font-semibold tracking-wide text-primary-deep">
          ✦ <span className="text-gradient-gold">Ave Maria</span>
        </div>
        <MusicToggle />
      </header>

      <section className="relative z-10 flex items-center justify-center px-4 sm:px-6 pb-20 pt-4 sm:pt-8 min-h-[calc(100vh-6rem)]">
        {phase === "start" && <StartScreen onStart={start} />}
        {phase === "playing" && (
          <QuestionCard
            key={index}
            question={questions[index]}
            index={index}
            total={questions.length}
            onAnswer={handleAnswer}
            onSkip={handleSkip}
          />
        )}
        {phase === "result" && (
          <ResultScreen score={score} total={questions.length} onRestart={start} />
        )}
      </section>

      {burst && <CorrectBurst />}
    </main>
  );
};

export default Index;
