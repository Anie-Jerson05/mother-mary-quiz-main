import maryBlessing from "@/assets/mary-blessing.png";
import maryHappy from "@/assets/mary-happy.png";
import marySad from "@/assets/mary-sad.png";

let done = false;

/** Preload result/feedback images so they appear instantly when needed. */
export const preloadMaryImages = () => {
  if (done || typeof window === "undefined") return;
  done = true;
  [maryBlessing, maryHappy, marySad].forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  });
};
