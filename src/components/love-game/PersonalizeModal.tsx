"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Copy } from "lucide-react";
import { LoveGameConfig } from "@/types/love-game";
import { PrimaryButton } from "../ui/PrimaryButton";

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LoveGameConfig;
  onSave: (newConfig: Partial<LoveGameConfig>) => void;
}

export function PersonalizeModal({
  isOpen,
  onClose,
  config,
  onSave,
}: PersonalizeModalProps) {
  const [recipient, setRecipient] = useState(config.recipientName);
  const [sender, setSender] = useState(config.senderName);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      recipientName: recipient.trim() || "My Favorite Human",
      senderName: sender.trim() || "Your Secret Admirer",
    });
    onClose();
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    if (recipient.trim()) url.searchParams.set("to", recipient.trim());
    if (sender.trim()) url.searchParams.set("from", sender.trim());

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-rose-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-1.5 rounded-full text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-rose-600">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-xl font-bold font-serif">Personalize This Game</h3>
          </div>
          <p className="text-xs text-rose-700/70 mb-5">
            Customize the names to make this proposal uniquely yours! You can also copy a personalized link to share.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-rose-800 mb-1">
                Recipient&apos;s Name (Who is this for?)
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Maya, Alex, My Love"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-rose-950 placeholder-rose-300 bg-rose-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-800 mb-1">
                Your Name / Secret Alias
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. Ethan, Your Secret Admirer"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-rose-950 placeholder-rose-300 bg-rose-50/40"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <PrimaryButton onClick={handleSave} fullWidth size="md">
              Apply & Save
            </PrimaryButton>

            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-rose-200 bg-rose-50/60 text-xs font-semibold text-rose-700 hover:bg-rose-100/80 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied with Names!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Shareable Link With These Names</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
