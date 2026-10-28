"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";
import { compatibilityQuestions } from "@/config/love-game";
import { ProgressBar } from "../ui/ProgressBar";
import { PrimaryButton } from "../ui/PrimaryButton";
import { fireHeartBurst } from "../ui/ConfettiEffect";

interface QuizScreenProps {
  currentIndex: number;
  answers: Record<number, number>;
  onAnswer: (questionId: number, optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  playPop: () => void;
}

export function QuizScreen({
  currentIndex,
  answers,
  onAnswer,
  onNext,
  onPrev,
  onComplete,
  playPop,
}: QuizScreenProps) {
  const currentQuestion = compatibilityQuestions[currentIndex];
  const selectedOptionIndex = answers[currentQuestion.id];
  const isSelected = selectedOptionIndex !== undefined;
  const isLastQuestion = currentIndex === compatibilityQuestions.length - 1;

  const handleSelect = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartBurst(x, y);
    onAnswer(currentQuestion.id, idx);
  };

  const handleProceed = () => {
    playPop();
    if (isLastQuestion) {
      onComplete();
    } else {
      onNext();
    }
  };

  const selectedReaction =
    isSelected && currentQuestion.options[selectedOptionIndex]
      ? currentQuestion.options[selectedOptionIndex].reaction
      : null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Screen Title & Subtitle */}
      <div className="text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-serif tracking-tight mb-1.5">
          Let&apos;s see how well you know your situation. 😏
        </h2>
        <p className="text-xs sm:text-sm text-rose-700/80">
          Answer honestly. The universe is watching.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <ProgressBar
          currentStep={currentIndex + 1}
          totalSteps={compatibilityQuestions.length}
          label="Compatibility Level"
        />
      </div>

      {/* Main Question Card with Smooth AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-white/85 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-xl shadow-rose-200/50 border border-white/90"
        >
          {/* Card Header with Counter & Icon */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                Q{currentIndex + 1}
              </span>
              <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                Question {currentIndex + 1} of {compatibilityQuestions.length}
              </span>
            </div>
            <HelpCircle className="w-4 h-4 text-rose-300" />
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-rose-950 mb-6 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options List */}
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
                    flex items-center justify-between gap-3 border
                    ${
                      isOptionSelected
                        ? "bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/15 border-rose-400 text-rose-950 font-semibold shadow-md shadow-rose-200/40 ring-2 ring-rose-400/40"
                        : "bg-white/70 hover:bg-rose-50/70 border-rose-100 text-rose-800 font-medium"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg shrink-0">
                      {option.emoji || "💖"}
                    </span>
                    <span className="text-sm sm:text-base leading-normal">
                      {option.label}
                    </span>
                  </div>
                  {isOptionSelected && (
                    <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Entertaining Reaction Banner */}
          <AnimatePresence>
            {selectedReaction && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 border border-rose-200/80 text-rose-900 text-xs sm:text-sm font-medium shadow-sm flex items-start gap-2.5">
                  <span className="text-base shrink-0">💬</span>
                  <p className="italic leading-relaxed">{selectedReaction}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
              onClick={handleProceed}
              disabled={!isSelected}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {isLastQuestion ? "Finish Quiz & Proceed ✨" : "Next Question"}
            </PrimaryButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
