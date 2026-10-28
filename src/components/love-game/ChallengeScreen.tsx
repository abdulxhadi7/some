"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, CheckCircle2, Lock } from "lucide-react";
import { ChallengeState } from "@/types/love-game";
import { PrimaryButton } from "../ui/PrimaryButton";
import { fireHeartBurst } from "../ui/ConfettiEffect";

interface ChallengeScreenProps {
  challenges: ChallengeState;
  onSmileTap: () => void;
  onTruthSelect: (ans: string) => void;
  onSuspenseSelect: (ans: string) => void;
  onContinue: () => void;
  playPop: () => void;
  playHeartChime: () => void;
}

export function ChallengeScreen({
  challenges,
  onSmileTap,
  onTruthSelect,
  onSuspenseSelect,
  onContinue,
  playPop,
  playHeartChime,
}: ChallengeScreenProps) {
  const allCompleted =
    challenges.smileCompleted &&
    challenges.truthAnswer !== null &&
    challenges.suspenseAnswer !== null;

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHeartChime();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartBurst(x, y);
    onSmileTap();
  };

  const handleTruth = (choice: "cute" | "shy") => {
    playPop();
    onTruthSelect(choice);
  };

  const handleSuspense = (choice: "ready" | "nervous") => {
    playPop();
    onSuspenseSelect(choice);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
          <span>Mini Challenges</span>
          <span className="text-rose-500">•</span>
          <span>
            {Number(challenges.smileCompleted) +
              Number(challenges.truthAnswer !== null) +
              Number(challenges.suspenseAnswer !== null)}
            /3 Complete
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-950 font-serif tracking-tight mb-1.5">
          ONE LAST TEST. 😈
        </h2>
        <p className="text-xs sm:text-sm text-rose-700/80">
          Let&apos;s see if you&apos;re ready for what&apos;s coming.
        </p>
      </div>

      <div className="w-full space-y-4 mb-7">
        {/* Challenge A: The Smile Test */}
        <div
          className={`p-5 rounded-3xl transition-all duration-300 border ${
            challenges.smileCompleted
              ? "bg-rose-50/80 border-rose-200 shadow-sm"
              : "bg-white/80 border-white/90 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Test A: The Smile Test
            </span>
            {challenges.smileCompleted ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Passed!
              </span>
            ) : (
              <span className="text-xs text-rose-400">Tap below</span>
            )}
          </div>

          <p className="text-sm font-semibold text-rose-900 mb-3">
            Tap the heart if this made you smile.
          </p>

          <div className="flex flex-col items-center justify-center py-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleHeartClick}
              className="p-4 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg shadow-rose-300/50 hover:shadow-rose-400 cursor-pointer"
              aria-label="Tap to smile"
            >
              <Heart
                className={`w-8 h-8 fill-current ${
                  challenges.smileCompleted ? "animate-pulse" : ""
                }`}
              />
            </motion.button>

            {challenges.smileCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-center"
              >
                <p className="text-xs sm:text-sm text-rose-600 font-medium">
                  Caught you smiling! That&apos;s going in the evidence folder. 💗
                </p>
                {challenges.smileCount > 1 && (
                  <p className="text-[11px] text-rose-400 mt-0.5">
                    Tapped {challenges.smileCount} times! You must really be smiling. 😊
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Challenge B: The Truth Test */}
        <div
          className={`p-5 rounded-3xl transition-all duration-300 border ${
            challenges.truthAnswer !== null
              ? "bg-rose-50/80 border-rose-200 shadow-sm"
              : "bg-white/80 border-white/90 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Test B: The Truth Test
            </span>
            {challenges.truthAnswer !== null ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Passed!
              </span>
            ) : (
              <span className="text-xs text-rose-400">Choose one</span>
            )}
          </div>

          <p className="text-sm font-semibold text-rose-900 mb-3">
            Choose one. No overthinking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleTruth("cute")}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                challenges.truthAnswer === "cute"
                  ? "bg-rose-500 text-white border-rose-600 shadow-md"
                  : "bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100/50"
              }`}
            >
              Tell me something cute. 💌
            </button>
            <button
              type="button"
              onClick={() => handleTruth("shy")}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                challenges.truthAnswer === "shy"
                  ? "bg-rose-500 text-white border-rose-600 shadow-md"
                  : "bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100/50"
              }`}
            >
              Skip, I&apos;m shy. 🙈
            </button>
          </div>

          {challenges.truthAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-white/70 border border-rose-200/60 text-xs text-rose-700 italic text-center"
            >
              {challenges.truthAnswer === "cute"
                ? "Somewhere, someone is hoping this little game makes your day a little better. ✨"
                : "Shy mode activated. That's suspiciously adorable. 🙈"}
            </motion.div>
          )}
        </div>

        {/* Challenge C: The Suspense Button */}
        <div
          className={`p-5 rounded-3xl transition-all duration-300 border ${
            challenges.suspenseAnswer !== null
              ? "bg-rose-50/80 border-rose-200 shadow-sm"
              : "bg-white/80 border-white/90 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Test C: The Suspense Button
            </span>
            {challenges.suspenseAnswer !== null ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready!
              </span>
            ) : (
              <span className="text-xs text-rose-400">Are you ready?</span>
            )}
          </div>

          <p className="text-sm font-semibold text-rose-900 mb-3">
            Are you ready for the real question?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSuspense("ready")}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                challenges.suspenseAnswer === "ready"
                  ? "bg-rose-500 text-white border-rose-600 shadow-md"
                  : "bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100/50"
              }`}
            >
              YES, JUST ASK! 🔥
            </button>
            <button
              type="button"
              onClick={() => handleSuspense("nervous")}
              className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                challenges.suspenseAnswer === "nervous"
                  ? "bg-rose-500 text-white border-rose-600 shadow-md"
                  : "bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100/50"
              }`}
            >
              WAIT, I&apos;M NERVOUS! 🥺
            </button>
          </div>

          {challenges.suspenseAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-white/70 border border-rose-200/60 text-xs text-rose-700 italic text-center"
            >
              {challenges.suspenseAnswer === "ready"
                ? "Confidence level: 100%. Let's see if that survives the next screen. 😏"
                : "Don't worry. Deep breaths. It's only a tiny little question... probably. 👀"}
            </motion.div>
          )}
        </div>
      </div>

      {/* Continue button */}
      <div className="w-full flex justify-center">
        {allCompleted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full sm:w-auto"
          >
            <PrimaryButton
              size="lg"
              onClick={onContinue}
              icon={<Sparkles className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-rose-400"
            >
              All Tests Passed! Take Me To The Moment ✨
            </PrimaryButton>
          </motion.div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-medium text-rose-400 bg-white/60 px-4 py-2.5 rounded-full border border-rose-100">
            <Lock className="w-3.5 h-3.5" />
            <span>Complete all 3 mini tests to unlock the next screen</span>
          </div>
        )}
      </div>
    </div>
  );
}
