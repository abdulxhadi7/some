"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScreenTransitionProps {
  children: ReactNode;
  screenKey: string;
  className?: string;
}

export function ScreenTransition({
  children,
  screenKey,
  className = "",
}: ScreenTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1], // Smooth custom ease
        }}
        className={`w-full max-w-xl mx-auto px-4 py-6 md:py-8 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
