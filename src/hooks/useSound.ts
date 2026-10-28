"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Web Audio API Synthesizer Sound Engine
// Reliable, zero 404s, works completely offline or online, lightweight.

export function useSound(initialMuted = false) {
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Button click / Pop sound
  const playPop = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio fallback silent
    }
  }, [isMuted, getAudioContext]);

  // Heart tap / Cute Chime sound
  const playHeartChime = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + idx * 0.05 + 0.25
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.25);
      });
    } catch {
      // Audio fallback silent
    }
  }, [isMuted, getAudioContext]);

  // Mischievous "Dodge" / Boing sound when NO button runs away
  const playBoing = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // Audio fallback silent
    }
  }, [isMuted, getAudioContext]);

  // Romantic Sparkle sound
  const playSparkle = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const freqs = [659.25, 830.61, 987.77, 1318.51, 1661.22];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.04 + 0.35
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.35);
      });
    } catch {
      // Audio fallback silent
    }
  }, [isMuted, getAudioContext]);

  // Grand Celebration fanfare sound
  const playCelebration = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Romantic fanfare chords: F major, G major, C major with shimmer
      const chordGroups = [
        { time: 0.0, freqs: [349.23, 440.0, 523.25] }, // F major
        { time: 0.22, freqs: [392.0, 493.88, 587.33] }, // G major
        { time: 0.45, freqs: [523.25, 659.25, 783.99, 1046.5] }, // C major (high)
      ];

      chordGroups.forEach(({ time, freqs }) => {
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

          const dur = time === 0.45 ? 1.4 : 0.25;
          gain.gain.setValueAtTime(0.12, ctx.currentTime + time);
          gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + time + dur
          );

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + time);
          osc.stop(ctx.currentTime + time + dur);
        });
      });
    } catch {
      // Audio fallback silent
    }
  }, [isMuted, getAudioContext]);

  // Ambient gentle romantic chord progression generator
  const startGentleMusic = useCallback(() => {
    if (musicIntervalRef.current) return;
    setIsMusicPlaying(true);

    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0], // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 392.0], // G7
    ];
    let chordIdx = 0;

    const playChordStep = () => {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const currentChord = chords[chordIdx % chords.length];
        chordIdx++;

        currentChord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

          gain.gain.setValueAtTime(0.025, ctx.currentTime + idx * 0.15);
          gain.gain.linearRampToValueAtTime(
            0.04,
            ctx.currentTime + idx * 0.15 + 0.6
          );
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + idx * 0.15 + 2.8
          );

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.15);
          osc.stop(ctx.currentTime + idx * 0.15 + 2.8);
        });
      } catch {
        // Safe fallback
      }
    };

    playChordStep();
    musicIntervalRef.current = setInterval(playChordStep, 3200);
  }, [isMuted, getAudioContext]);

  const stopGentleMusic = useCallback(() => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    setIsMusicPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        stopGentleMusic();
      }
      return next;
    });
  }, [stopGentleMusic]);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      stopGentleMusic();
    } else {
      if (isMuted) setIsMuted(false);
      startGentleMusic();
    }
  }, [isMusicPlaying, isMuted, startGentleMusic, stopGentleMusic]);

  useEffect(() => {
    return () => {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
      }
    };
  }, []);

  return {
    isMuted,
    isMusicPlaying,
    toggleMute,
    toggleMusic,
    playPop,
    playHeartChime,
    playBoing,
    playSparkle,
    playCelebration,
    startGentleMusic,
    stopGentleMusic,
  };
}
