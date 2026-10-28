"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, AlertCircle } from "lucide-react";
import { LoveGameConfig } from "@/types/love-game";
import { PrimaryButton } from "../ui/PrimaryButton";
import { fireHeartBurst } from "../ui/ConfettiEffect";

interface WelcomeScreenProps {
  config: LoveGameConfig;
  onStart: () => void;
  playPop: () => void;
  playHeartChime: () => void;
}

export function WelcomeScreen({
  config,
  onStart,
  playPop,
  playHeartChime,
}: WelcomeScreenProps) {
  const [isLoadingDestiny, setIsLoadingDestiny] = useState(false);

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHeartChime();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartBurst(x, y);

    setIsLoadingDestiny(true);
    setTimeout(() => {
      onStart();
    }, 700);
  };

  const displayName =
    config.recipientName && config.recipientName !== "My Favorite Human"
      ? config.recipientName
      : "You";

  return (
    <div className="w-full flex flex-col items-center text-center">
      {/* Animated Beating Heart Hero */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1, 1.15, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-6 cursor-pointer"
        onClick={() => {
          playPop();
          fireHeartBurst(0.5, 0.35);
        }}
        title="Tap me!"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-rose-300 flex items-center justify-center shadow-xl shadow-rose-300/60 border-2 border-white/80">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white drop-shadow-md" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-pink-400 -z-10"
        />
        <span className="absolute -top-1 -right-1 text-sm">✨</span>
      </motion.div>

      {/* Main Glassmorphic Card */}
      <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-rose-200/50 border border-white/90">
        {/* Subtle decorative tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold mb-4 border border-rose-200/60">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>A Special Interactive Experience</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-950 font-serif tracking-tight leading-tight mb-4">
          Hey {displayName}. Yes, YOU. 💗
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl font-medium text-rose-700/90 mb-3">
          Someone has a very important question for you...
        </p>

        {/* Additional teasing copy */}
        <p className="text-sm sm:text-base text-rose-800/70 max-w-md mx-auto mb-8">
          But first, you&apos;ll have to survive a tiny little game. 👀
        </p>

        {/* Action Button & Loading state */}
        <div className="flex flex-col items-center gap-3">
          {isLoadingDestiny ? (
            <div className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-rose-100 text-rose-700 font-semibold text-base animate-pulse shadow-inner">
              <span className="animate-spin text-lg">⏳</span>
              <span>Preparing your destiny... 💌</span>
            </div>
          ) : (
            <PrimaryButton
              size="lg"
              onClick={handleStart}
              className="w-full sm:w-auto min-w-[260px] text-base sm:text-lg"
            >
              Okay, I&apos;m curious 💌
            </PrimaryButton>
          )}

          {/* Warning / Teaser */}
          <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Warning: Excessive cuteness ahead.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
