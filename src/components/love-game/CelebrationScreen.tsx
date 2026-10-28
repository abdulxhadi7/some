"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Share2, RotateCcw, Heart, Check, PartyPopper } from "lucide-react";
import { LoveGameConfig } from "@/types/love-game";
import { PrimaryButton } from "../ui/PrimaryButton";
import { fireCelebrationConfetti } from "../ui/ConfettiEffect";

interface CelebrationScreenProps {
  config: LoveGameConfig;
  onRestart: () => void;
  onOpenPersonalize: () => void;
  playCelebration: () => void;
  playPop: () => void;
}

export function CelebrationScreen({
  config,
  onRestart,
  onOpenPersonalize,
  playCelebration,
  playPop,
}: CelebrationScreenProps) {
  const [copied, setCopied] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Fire celebration confetti and sound
    fireCelebrationConfetti();
    playCelebration();

    // Additional confetti burst after 1.2s for celebration feel
    const tExtra = setTimeout(() => {
      fireCelebrationConfetti();
    }, 1200);

    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1400);
    const t3 = setTimeout(() => setStage(3), 2400);

    return () => {
      clearTimeout(tExtra);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [playCelebration]);

  const handleShare = () => {
    playPop();
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator
          .share({
            title: config.websiteTitle,
            text: `They said YES! 💖 Look at this adorable couple proposal game!`,
            url: window.location.href,
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
      }
    }
  };

  const recipientDisplay =
    config.recipientName && config.recipientName !== "My Favorite Human"
      ? config.recipientName
      : "You";

  const senderDisplay =
    config.senderName && config.senderName !== "Your Secret Admirer"
      ? config.senderName
      : "Me";

  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      {/* Celebration Trophy Card */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 shadow-2xl shadow-rose-300/40 border border-rose-200">
        {/* Celebration Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.2, 1.15, 1], rotate: [0, 8, -8, 0], opacity: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 flex items-center justify-center shadow-xl shadow-rose-300/60 mb-5"
        >
          <PartyPopper className="w-10 h-10 text-white" />
        </motion.div>

        {/* Sequential Celebration Headlines */}
        <div className="space-y-2 mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-rose-600 tracking-tight"
          >
            {config.successHeading}
          </motion.h1>

          {stage >= 1 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm sm:text-base font-extrabold text-rose-800 tracking-widest uppercase"
            >
              THIS IS NOT A DRILL. 🚨
            </motion.p>
          )}

          {stage >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-rose-700/80 font-medium"
            >
              Somebody is smiling at their screen right now. 👀
            </motion.p>
          )}

          {stage >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm sm:text-base text-rose-950 font-semibold"
            >
              {config.finalMessage}
            </motion.p>
          )}
        </div>

        {/* Official Cute Certificate Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50/50 to-amber-50/40 border border-rose-200/80 shadow-inner mb-6 text-left"
        >
          <div className="flex items-center justify-between border-b border-rose-200/60 pb-3 mb-3">
            <span className="text-[11px] font-bold text-rose-400 tracking-widest uppercase">
              Official Love Certificate
            </span>
            <span className="text-xs text-rose-500 font-semibold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              Verified Match
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-rose-800 shrink-0">STATUS:</span>
              <span className="font-bold text-rose-600 text-right">
                CUTE TOGETHER 💞 ({senderDisplay} + {recipientDisplay})
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-rose-800 shrink-0">OFFICIAL TITLE:</span>
              <span className="font-bold text-rose-700 text-right">
                Each other&apos;s favorite notification. 📱
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-rose-800 shrink-0">NEXT MISSION:</span>
              <span className="font-bold text-rose-700 text-right">
                Make endless cute memories together. 🌟
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Controls */}
        <div className="flex flex-col gap-3">
          <PrimaryButton
            size="lg"
            onClick={onRestart}
            icon={<RotateCcw className="w-5 h-5" />}
            className="w-full"
          >
            Replay Our Little Love Story ↻
          </PrimaryButton>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-rose-200 bg-rose-50/80 hover:bg-rose-100 text-xs sm:text-sm font-semibold text-rose-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share This Website</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenPersonalize}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-rose-200 bg-white hover:bg-rose-50/80 text-xs sm:text-sm font-semibold text-rose-600 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Personalize for Someone</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
