"use client";

import { Volume2, VolumeX, Music, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

interface SoundToggleProps {
  isMuted: boolean;
  isMusicPlaying: boolean;
  onToggleMute: () => void;
  onToggleMusic: () => void;
  onOpenSettings?: () => void;
}

export function SoundToggle({
  isMuted,
  isMusicPlaying,
  onToggleMute,
  onToggleMusic,
  onOpenSettings,
}: SoundToggleProps) {
  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 sm:gap-2 bg-white/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-rose-200/60 shadow-sm">
      {/* Background Melody toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleMusic}
        type="button"
        className={`p-1.5 rounded-full text-xs flex items-center gap-1 transition-colors ${
          isMusicPlaying
            ? "bg-rose-500 text-white shadow-sm"
            : "text-rose-600 hover:bg-rose-100/60"
        }`}
        aria-label={isMusicPlaying ? "Stop Romantic Music" : "Play Romantic Music"}
        title={isMusicPlaying ? "Stop Romantic Music" : "Play Romantic Music"}
      >
        <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? "animate-spin" : ""}`} />
        <span className="text-[11px] font-medium hidden md:inline">
          {isMusicPlaying ? "Music On" : "Music"}
        </span>
      </motion.button>

      {/* Sound Effects Mute toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleMute}
        type="button"
        className="p-1.5 rounded-full text-rose-600 hover:bg-rose-100/60 transition-colors"
        aria-label={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-rose-600" />
        )}
      </motion.button>

      {/* Personalize Button */}
      {onOpenSettings && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenSettings}
          type="button"
          className="p-1.5 rounded-full text-rose-600 hover:bg-rose-100/60 transition-colors"
          aria-label="Personalize Names"
          title="Personalize Names"
        >
          <Settings2 className="w-3.5 h-3.5 text-rose-500" />
        </motion.button>
      )}
    </div>
  );
}
