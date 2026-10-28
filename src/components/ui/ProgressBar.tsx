"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  label,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className={`w-full max-w-md mx-auto ${className}`} aria-label={label || "Game Progress"}>
      <div className="flex items-center justify-between text-xs font-medium text-rose-500/80 mb-1.5 px-1">
        <span>{label || "Love Progress"}</span>
        <span>
          {currentStep} / {totalSteps}
        </span>
      </div>
      <div className="h-2.5 w-full bg-rose-100/70 rounded-full overflow-hidden p-0.5 backdrop-blur-sm border border-rose-200/50 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Subtle sparkle shine */}
          <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
