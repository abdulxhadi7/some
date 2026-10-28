"use client";

import confetti from "canvas-confetti";

export function fireCelebrationConfetti() {
  if (typeof window === "undefined") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-stage colorful romantic burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#E11D48", "#F472B6", "#FB7185", "#FFE4E6"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#FDA4AF", "#E879F9", "#F43F5E", "#FFF"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#BE123C", "#EC4899", "#F472B6", "#FFD700"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ["#E11D48", "#DB2777", "#F43F5E"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#FF69B4", "#FF1493", "#FFF0F5"],
  });
}

// Mini heart burst for small interactive events (heart clicks, challenge smile, etc.)
export function fireHeartBurst(x = 0.5, y = 0.5) {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 22,
    spread: 50,
    origin: { x, y },
    colors: ["#E11D48", "#F472B6", "#FB7185", "#FDA4AF"],
    scalar: 0.9,
    ticks: 60,
    gravity: 0.8,
    zIndex: 9999,
  });
}
