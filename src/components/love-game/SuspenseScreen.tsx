"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Clock } from "lucide-react";
import { PrimaryButton } from "../ui/PrimaryButton";

interface SuspenseScreenProps {
  onReady: () => void;
  playPop: () => void;
  playSparkle: () => void;
}

export function SuspenseScreen({
  onReady,
  playPop,
  playSparkle,
}: SuspenseScreenProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [notReadyClicked, setNotReadyClicked] = useState(false);

  const lines = [
    "Okay... enough games.",
    "There's something I've wanted to ask you.",
    "And I've been looking for the right way to do it.",
    "So I made this little thing instead.",
    "Ready?",
  ];

  useEffect(() => {
    // Reveal lines sequentially with gentle delay
    const timers = [
      setTimeout(() => setLineIndex(1), 700),
      setTimeout(() => setLineIndex(2), 2000),
      setTimeout(() => setLineIndex(3), 3300),
      setTimeout(() => setLineIndex(4), 4600),
      setTimeout(() => {
        setLineIndex(5);
        playSparkle();
      }, 5800),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [playSparkle]);

  const handleNotReady = () => {
    playPop();
    setNotReadyClicked(true);
  };

  const handleProceed = () => {
    playSparkle();
    onReady();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-6">
      {/* Subtle glowing ring icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-16 h-16 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-300/40 flex items-center justify-center mb-6 shadow-xl text-rose-300"
      >
        <Heart className="w-8 h-8 fill-rose-400 text-rose-400" />
      </motion.div>

      {/* Narrative Card */}
      <div className="w-full max-w-lg bg-black/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl text-white">
        <div className="space-y-4 min-h-[180px] flex flex-col items-center justify-center">
          {lines.map((text, idx) => {
            const isVisible = lineIndex > idx;
            const isLastQuestion = idx === lines.length - 1;

            if (!isVisible) return null;

            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`
                  ${
                    isLastQuestion
                      ? "text-3xl sm:text-4xl font-serif font-extrabold text-pink-300 mt-4 tracking-wide"
                      : "text-base sm:text-lg font-medium text-rose-100/90 leading-relaxed"
                  }
                `}
              >
                {text}
              </motion.p>
            );
          })}
        </div>

        {/* Buttons reveal after all lines show */}
        <AnimatePresence>
          {lineIndex >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              {!notReadyClicked ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <PrimaryButton
                    size="lg"
                    onClick={handleProceed}
                    icon={<Sparkles className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    I&apos;m ready 💗
                  </PrimaryButton>

                  <button
                    type="button"
                    onClick={handleNotReady}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-rose-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
                  >
                    I&apos;M NOT READY 😭
                  </button>
                </div>
              ) : (
                /* Fun fallback if visitor clicks NOT READY */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-rose-200 text-xs sm:text-sm">
                    <p className="font-semibold text-pink-300 mb-1 flex items-center justify-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin" />
                      Loading Courage... 99%
                    </p>
                    <p>Fair enough. Even courage needs a loading screen. 😂</p>
                  </div>

                  <PrimaryButton
                    size="lg"
                    onClick={handleProceed}
                    className="w-full sm:w-auto shadow-rose-500/50"
                  >
                    Okay, NOW I&apos;m ready! 💖
                  </PrimaryButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
