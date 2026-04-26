import { Sparkles } from "./Sparkles";
import { SmartImage } from "./SmartImage";
import maryHappy from "@/assets/mary-happy.png";

export const CorrectBurst = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center animate-fade-in-up">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64">
        <div className="absolute inset-0 bg-halo animate-halo-pulse rounded-full" />
        <Sparkles count={20} />
        <SmartImage
          src={maryHappy}
          alt=""
          eager
          width={256}
          height={256}
          className="relative w-full h-full object-contain animate-joyful-dance drop-shadow-[0_0_30px_hsl(45_90%_70%/0.7)]"
        />
      </div>
    </div>
  );
};
