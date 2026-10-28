"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { LoveGameConfig } from "@/types/love-game";
import { PrimaryButton } from "../ui/PrimaryButton";

interface ProposalScreenProps {
  config: LoveGameConfig;
  onYes: () => void;
  rejectionCount: number;
  currentRejectionMsg: string;
  noButtonPosition: { x: number; y: number };
  onNoInteraction: (containerWidth: number, containerHeight: number) => void;
  playPop: () => void;
  playBoing: () => void;
  playSparkle: () => void;
}

export function ProposalScreen({
  config,
  onYes,
  rejectionCount,
  currentRejectionMsg,
  noButtonPosition,
  onNoInteraction,
  playPop,
  playBoing,
  playSparkle,
}: ProposalScreenProps) {
  const [introStep, setIntroStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic intro sequence
    const t1 = setTimeout(() => setIntroStep(1), 500);
    const t2 = setTimeout(() => setIntroStep(2), 1700);
    const t3 = setTimeout(() => setIntroStep(3), 2900);
    const t4 = setTimeout(() => {
      setIntroStep(4);
      playSparkle();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [playSparkle]);

  const handleNoDodge = () => {
    playBoing();
    const width = containerRef.current?.offsetWidth || 340;
    const height = containerRef.current?.offsetHeight || 140;
    onNoInteraction(width, height);
  };

  // Grow the YES button slightly with each rejection attempt (up to a reasonable max)
  const yesButtonScale = Math.min(1.22, 1 + rejectionCount * 0.04);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      {/* Proposal Card */}
      <div
        ref={containerRef}
        className="relative w-full max-w-lg bg-gradient-to-b from-white/95 via-rose-50/90 to-pink-50/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 shadow-2xl shadow-rose-950/20 border border-white/90 overflow-hidden"
      >
        {/* Animated Ring & Beating Hearts Central Hero */}
        <div className="relative mb-6 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 p-1 flex items-center justify-center shadow-xl shadow-rose-300/60"
          >
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl shadow-inner select-none">
              💍
            </div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-pink-400 blur-lg -z-10"
          />

          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-2 animate-bounce" />
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 absolute -bottom-1 -left-2 animate-pulse" />
        </div>

        {/* Intro Teaser Lines */}
        <div className="min-h-[50px] mb-4 space-y-1">
          {introStep >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm font-semibold text-rose-500 tracking-wide uppercase"
            >
              Okay... here goes nothing.
            </motion.p>
          )}

          {introStep >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-rose-700/80 italic"
            >
              I could have just texted you this...
            </motion.p>
          )}

          {introStep >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-rose-800 font-medium"
            >
              But where&apos;s the fun in that? 💗
            </motion.p>
          )}
        </div>

        {/* Grand Question Reveal */}
        {introStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mt-2 mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-rose-800 tracking-tight leading-tight mb-2 drop-shadow-sm">
              {config.proposalQuestion}
            </h1>
            <p className="text-sm sm:text-base font-medium text-rose-700/90">
              One little question. A whole lot of feelings.
            </p>
          </motion.div>
        )}

        {/* Playful Rejection Toast / Message */}
        <AnimatePresence>
          {currentRejectionMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium shadow-sm inline-block"
            >
              <span>{currentRejectionMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons Interactive Playground */}
        {introStep >= 4 && (
          <div className="relative min-h-[140px] flex flex-col items-center justify-center pt-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              {/* PRIMARY YES BUTTON */}
              <motion.div
                animate={{ scale: yesButtonScale }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="w-full sm:w-auto z-20"
              >
                <PrimaryButton
                  size="lg"
                  onClick={() => {
                    playPop();
                    onYes();
                  }}
                  icon={<Heart className="w-5 h-5 fill-current" />}
                  className="w-full sm:w-auto text-base sm:text-lg shadow-rose-400/80 animate-pulse"
                >
                  YES, ABSOLUTELY! 💖
                </PrimaryButton>
              </motion.div>

              {/* SECONDARY PLAYFUL NO BUTTON */}
              <motion.div
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 18,
                }}
                className="w-full sm:w-auto z-10"
              >
                <button
                  type="button"
                  onMouseEnter={handleNoDodge}
                  onClick={handleNoDodge}
                  onTouchStart={handleNoDodge}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-rose-400 bg-rose-50/80 hover:bg-rose-100 border border-rose-200 shadow-sm transition-colors cursor-pointer select-none"
                  aria-label="No option (Playfully dodges!)"
                >
                  NOPE 🙈
                </button>
              </motion.div>
            </div>

            {/* Teasing footnote */}
            <p className="text-[11px] text-rose-400 mt-5 italic">
              Hint: Only one of these buttons believes in true love. 😉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
