"use client";

import { useState, useCallback } from "react";
import {
  GameScreen,
  ChallengeState,
  LoveGameConfig,
} from "@/types/love-game";
import {
  defaultGameConfig,
  funnyRejectionMessages,
} from "@/config/love-game";

export function useLoveGame() {
  const [config, setConfig] = useState<LoveGameConfig>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      const from = params.get("from");
      if (to || from) {
        return {
          ...defaultGameConfig,
          recipientName: to ? decodeURIComponent(to) : defaultGameConfig.recipientName,
          senderName: from ? decodeURIComponent(from) : defaultGameConfig.senderName,
        };
      }
    }
    return defaultGameConfig;
  });
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("welcome");
  
  // Quiz progress states
  const [compatibilityIndex, setCompatibilityIndex] = useState(0);
  const [compatibilityAnswers, setCompatibilityAnswers] = useState<Record<number, number>>({});
  
  const [confessionIndex, setConfessionIndex] = useState(0);
  const [confessionAnswers, setConfessionAnswers] = useState<Record<number, number>>({});
  const [showConfessionReveal, setShowConfessionReveal] = useState(false);

  // Challenges
  const [challenges, setChallenges] = useState<ChallengeState>({
    smileCompleted: false,
    smileCount: 0,
    truthAnswer: null,
    suspenseAnswer: null,
  });

  // Proposal interaction
  const [rejectionCount, setRejectionCount] = useState(0);
  const [currentRejectionMsg, setCurrentRejectionMsg] = useState("");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);



  // Screen navigation
  const goToScreen = useCallback((screen: GameScreen) => {
    setCurrentScreen(screen);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Quiz handlers
  const answerCompatibility = useCallback((questionId: number, optionIndex: number) => {
    setCompatibilityAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const nextCompatibility = useCallback(() => {
    setCompatibilityIndex((prev) => prev + 1);
  }, []);

  const prevCompatibility = useCallback(() => {
    setCompatibilityIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Confession handlers
  const answerConfession = useCallback((questionId: number, optionIndex: number) => {
    setConfessionAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const nextConfession = useCallback(() => {
    setConfessionIndex((prev) => prev + 1);
  }, []);

  const prevConfession = useCallback(() => {
    setConfessionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Challenge handlers
  const incrementSmile = useCallback(() => {
    setChallenges((prev) => ({
      ...prev,
      smileCompleted: true,
      smileCount: prev.smileCount + 1,
    }));
  }, []);

  const setTruthAnswer = useCallback((answer: string) => {
    setChallenges((prev) => ({
      ...prev,
      truthAnswer: answer,
    }));
  }, []);

  const setSuspenseAnswer = useCallback((answer: string) => {
    setChallenges((prev) => ({
      ...prev,
      suspenseAnswer: answer,
    }));
  }, []);

  const allChallengesCompleted =
    challenges.smileCompleted &&
    challenges.truthAnswer !== null &&
    challenges.suspenseAnswer !== null;

  // Proposal interaction: NO button dodge & mocking response
  const triggerNoInteraction = useCallback((containerWidth = 320, containerHeight = 160) => {
    setRejectionCount((prev) => {
      const newCount = prev + 1;
      const msgIndex = (newCount - 1) % funnyRejectionMessages.length;
      setCurrentRejectionMsg(funnyRejectionMessages[msgIndex]);
      return newCount;
    });

    // Calculate safe bounding movement so button never exits the container or overlaps YES
    // Random offset between -90 and +90 px on X, -40 and +40 px on Y
    const maxOffsetMobileX = Math.min(100, (containerWidth / 2) - 40);
    const maxOffsetMobileY = Math.min(50, (containerHeight / 2) - 20);

    const randomX = (Math.random() - 0.5) * (maxOffsetMobileX * 2);
    const randomY = (Math.random() - 0.5) * (maxOffsetMobileY * 2);

    setIsDodging(true);
    setNoButtonPosition({
      x: Math.round(randomX),
      y: Math.round(randomY),
    });
  }, []);

  // Reset/Restart
  const restartGame = useCallback(() => {
    setCurrentScreen("welcome");
    setCompatibilityIndex(0);
    setCompatibilityAnswers({});
    setConfessionIndex(0);
    setConfessionAnswers({});
    setShowConfessionReveal(false);
    setChallenges({
      smileCompleted: false,
      smileCount: 0,
      truthAnswer: null,
      suspenseAnswer: null,
    });
    setRejectionCount(0);
    setCurrentRejectionMsg("");
    setNoButtonPosition({ x: 0, y: 0 });
    setIsDodging(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Update personalization settings
  const updateConfig = useCallback((newConfig: Partial<LoveGameConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  return {
    config,
    updateConfig,
    currentScreen,
    goToScreen,
    // Compatibility quiz
    compatibilityIndex,
    compatibilityAnswers,
    answerCompatibility,
    nextCompatibility,
    prevCompatibility,
    // Confession quiz
    confessionIndex,
    confessionAnswers,
    showConfessionReveal,
    setShowConfessionReveal,
    answerConfession,
    nextConfession,
    prevConfession,
    // Challenges
    challenges,
    incrementSmile,
    setTruthAnswer,
    setSuspenseAnswer,
    allChallengesCompleted,
    // Proposal
    rejectionCount,
    currentRejectionMsg,
    noButtonPosition,
    isDodging,
    triggerNoInteraction,
    restartGame,
  };
}
