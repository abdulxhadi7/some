"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import { confessionQuestions } from "@/config/love-game";
import { LoveGameConfig } from "@/types/love-game";
import { ProgressBar } from "../ui/ProgressBar";
import { PrimaryButton } from "../ui/PrimaryButton";
import { fireHeartBurst } from "../ui/ConfettiEffect";

interface ConfessionScreenProps {
  config: LoveGameConfig;
  currentIndex: number;
  answers: Record<number, number>;
  showReveal: boolean;
  setShowReveal: (show: boolean) => void;
  onAnswer: (questionId: number, optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  playPop: () => void;
  playSparkle: () => void;
}

export function ConfessionScreen({
  config,
  currentIndex,
  answers,
  showReveal,
  setShowReveal,
  onAnswer,
  onNext,
  onPrev,
  onComplete,
  playPop,
  playSparkle,
}: ConfessionScreenProps) {
  const currentQuestion = confessionQuestions[currentIndex];
  const selectedOptionIndex = answers[currentQuestion?.id ?? 1];
  const isSelected = selectedOptionIndex !== undefined;
  const isLastQuestion = currentIndex === confessionQuestions.length - 1;

  const [revealStep, setRevealStep] = useState(0);

  const handleSelect = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartBurst(x, y);
    onAnswer(currentQuestion.id, idx);
  };

  const handleNextStep = () => {
    playPop();
    if (isLastQuestion) {
      playSparkle();
      setShowReveal(true);
      // Staged reveal animation
      setTimeout(() => setRevealStep(1), 600);
      setTimeout(() => setRevealStep(2), 1600);
      setTimeout(() => setRevealStep(3), 2600);
    } else {
      onNext();
    }
  };

  const senderAlias =
    config.senderName && config.senderName !== "Your Secret Admirer"
      ? config.senderName
      : "me";

  return (
    <div className="w-full flex flex-col items-center">
      {/* If the post-quiz confession reveal is triggered */}
      {showReveal ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 shadow-2xl shadow-rose-300/40 border border-rose-200 text-center"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-6 shadow-inner">
            <HeartHandshake className="w-7 h-7" />
          </div>

          <div className="space-y-4 mb-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: revealStep >= 1 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl font-serif text-rose-950 font-bold"
            >
              You know what&apos;s funny?
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: revealStep >= 2 ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-rose-800 font-medium leading-relaxed"
            >
              This started as a game... but someone had a little more in mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: revealStep >= 3 ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="pt-2"
            >
              <div className="inline-block px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-purple-500/10 border border-rose-300/60 shadow-sm">
                <p className="text-xl sm:text-2xl font-serif font-extrabold text-rose-600">
                  And that someone might be {senderAlias}. 🙈
                </p>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {revealStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PrimaryButton
                  size="lg"
                  onClick={onComplete}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Wait, really? Continue... 💭
                </PrimaryButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Regular Question Card */
        <>
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-serif tracking-tight mb-1.5">
              Okay, jokes aside for a second... 💗
            </h2>
            <p className="text-xs sm:text-sm text-rose-700/80">
              Let&apos;s talk about the things we don&apos;t always say out loud.
            </p>
          </div>

          <div className="w-full mb-6">
            <ProgressBar
              currentStep={currentIndex + 1}
              totalSteps={confessionQuestions.length}
              label="Intimacy Check"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white/85 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-xl shadow-rose-200/50 border border-white/90"
            >
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-rose-100">
                <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                  Deep Question {currentIndex + 1} of {confessionQuestions.length}
                </span>
                <Sparkles className="w-4 h-4 text-rose-300" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-rose-950 mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                  const isOptionSelected = selectedOptionIndex === idx;

                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleSelect(idx, e)}
                      className={`
                        w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer
                        border flex items-center justify-between gap-3
                        ${
                          isOptionSelected
                            ? "bg-rose-500/10 border-rose-400 text-rose-950 font-semibold shadow-md ring-2 ring-rose-400/30"
                            : "bg-white/70 hover:bg-rose-50/70 border-rose-100 text-rose-800 font-medium"
                        }
                      `}
                    >
                      <span className="text-sm sm:text-base leading-normal">
                        {option.label}
                      </span>
                      {isOptionSelected && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500 text-white font-semibold">
                          Selected
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-rose-100">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={currentIndex === 0}
                  className={`
                    inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold
                    transition-colors cursor-pointer
                    ${
                      currentIndex === 0
                        ? "opacity-30 cursor-not-allowed text-rose-300"
                        : "text-rose-600 hover:bg-rose-100/60"
                    }
                  `}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <PrimaryButton
                  size="md"
                  onClick={handleNextStep}
                  disabled={!isSelected}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLastQuestion ? "Next 💭" : "Continue"}
                </PrimaryButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
