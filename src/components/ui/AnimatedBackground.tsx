"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "heart" | "sparkle" | "star";
}

const STATIC_PARTICLES: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  size: 12 + (i % 5) * 6,
  left: 5 + (i * 5.2) % 90,
  duration: 12 + (i % 6) * 3,
  delay: (i % 7) * 1.5,
  opacity: 0.15 + (i % 4) * 0.12,
  type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "sparkle" : "star",
}));

interface AnimatedBackgroundProps {
  variant?: "light" | "romantic" | "deep" | "celebration";
}

export function AnimatedBackground({ variant = "light" }: AnimatedBackgroundProps) {
  // Background gradient variants
  const getGradient = () => {
    switch (variant) {
      case "deep":
        return "from-[#2A0813] via-[#4C0519] to-[#1F040E]";
      case "romantic":
        return "from-[#FFF0F5] via-[#FCE7F3] to-[#F3E8FF]";
      case "celebration":
        return "from-[#FFF1F2] via-[#FCE7F3] to-[#FEF3C7]";
      case "light":
      default:
        return "from-[#FFFDFB] via-[#FFF1F2] to-[#FCE7F3]";
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden bg-gradient-to-br ${getGradient()} transition-colors duration-1000 -z-10`}>
      {/* Soft atmospheric glowing blobs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: variant === "deep" ? [0.35, 0.5, 0.35] : [0.45, 0.65, 0.45],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl ${
          variant === "deep"
            ? "bg-rose-900/40"
            : "bg-pink-300/40"
        }`}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: variant === "deep" ? [0.25, 0.45, 0.25] : [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute top-1/2 -right-24 w-80 h-80 rounded-full blur-3xl ${
          variant === "deep"
            ? "bg-fuchsia-950/40"
            : "bg-purple-200/40"
        }`}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
          opacity: variant === "deep" ? [0.2, 0.35, 0.2] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className={`absolute -bottom-24 left-1/3 w-96 h-96 rounded-full blur-3xl ${
          variant === "deep"
            ? "bg-burgundy-900/40"
            : "bg-peach-200/40"
        }`}
      />

      {/* Floating hearts and sparkles floating up slowly */}
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [0, (p.id % 2 === 0 ? 25 : -25), 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          className={variant === "deep" ? "text-rose-300/50" : "text-pink-400/40"}
        >
          {p.type === "heart" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === "sparkle" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-pulse">
              <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
            </svg>
          )}
          {p.type === "star" && (
            <span className="text-xs select-none block text-center">✨</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
