"use client";

import { useState } from "react";
import { useLoveGame } from "@/hooks/useLoveGame";
import { useSound } from "@/hooks/useSound";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { ScreenTransition } from "@/components/ui/ScreenTransition";
import { WelcomeScreen } from "@/components/love-game/WelcomeScreen";
import { QuizScreen } from "@/components/love-game/QuizScreen";
import { ConfessionScreen } from "@/components/love-game/ConfessionScreen";
import { ChallengeScreen } from "@/components/love-game/ChallengeScreen";
import { SuspenseScreen } from "@/components/love-game/SuspenseScreen";
import { ProposalScreen } from "@/components/love-game/ProposalScreen";
import { CelebrationScreen } from "@/components/love-game/CelebrationScreen";
import { PersonalizeModal } from "@/components/love-game/PersonalizeModal";

export default function LoveGamePage() {
  const {
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
    // Proposal
    rejectionCount,
    currentRejectionMsg,
    noButtonPosition,
    triggerNoInteraction,
    restartGame,
  } = useLoveGame();

  const {
    isMuted,
    isMusicPlaying,
    toggleMute,
    toggleMusic,
    playPop,
    playHeartChime,
    playBoing,
    playSparkle,
    playCelebration,
  } = useSound();

  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  // Background gradient variant dynamically follows the emotional arc
  const getBackgroundVariant = () => {
    switch (currentScreen) {
      case "suspense":
      case "proposal":
        return "deep";
      case "celebration":
        return "celebration";
      case "confession":
        return "romantic";
      default:
        return "light";
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between selection:bg-rose-200">
      {/* Animated Dynamic Background */}
      <AnimatedBackground variant={getBackgroundVariant()} />

      {/* Persistent Audio and Personalization Controls */}
      <SoundToggle
        isMuted={isMuted}
        isMusicPlaying={isMusicPlaying}
        onToggleMute={toggleMute}
        onToggleMusic={toggleMusic}
        onOpenSettings={() => setIsPersonalizeOpen(true)}
      />

      {/* Main Interactive Screen Router */}
      <div className="flex-1 flex items-center justify-center pt-14 pb-8">
        <ScreenTransition screenKey={currentScreen}>
          {currentScreen === "welcome" && (
            <WelcomeScreen
              config={config}
              onStart={() => goToScreen("quiz")}
              playPop={playPop}
              playHeartChime={playHeartChime}
            />
          )}

          {currentScreen === "quiz" && (
            <QuizScreen
              currentIndex={compatibilityIndex}
              answers={compatibilityAnswers}
              onAnswer={answerCompatibility}
              onNext={nextCompatibility}
              onPrev={() => {
                if (compatibilityIndex > 0) {
                  prevCompatibility();
                } else {
                  goToScreen("welcome");
                }
              }}
              onComplete={() => goToScreen("confession")}
              playPop={playPop}
            />
          )}

          {currentScreen === "confession" && (
            <ConfessionScreen
              config={config}
              currentIndex={confessionIndex}
              answers={confessionAnswers}
              showReveal={showConfessionReveal}
              setShowReveal={setShowConfessionReveal}
              onAnswer={answerConfession}
              onNext={nextConfession}
              onPrev={() => {
                if (showConfessionReveal) {
                  setShowConfessionReveal(false);
                } else if (confessionIndex > 0) {
                  prevConfession();
                } else {
                  goToScreen("quiz");
                }
              }}
              onComplete={() => goToScreen("challenge")}
              playPop={playPop}
              playSparkle={playSparkle}
            />
          )}

          {currentScreen === "challenge" && (
            <ChallengeScreen
              challenges={challenges}
              onSmileTap={incrementSmile}
              onTruthSelect={setTruthAnswer}
              onSuspenseSelect={setSuspenseAnswer}
              onContinue={() => goToScreen("suspense")}
              playPop={playPop}
              playHeartChime={playHeartChime}
            />
          )}

          {currentScreen === "suspense" && (
            <SuspenseScreen
              onReady={() => goToScreen("proposal")}
              playPop={playPop}
              playSparkle={playSparkle}
            />
          )}

          {currentScreen === "proposal" && (
            <ProposalScreen
              config={config}
              onYes={() => goToScreen("celebration")}
              rejectionCount={rejectionCount}
              currentRejectionMsg={currentRejectionMsg}
              noButtonPosition={noButtonPosition}
              onNoInteraction={triggerNoInteraction}
              playPop={playPop}
              playBoing={playBoing}
              playSparkle={playSparkle}
            />
          )}

          {currentScreen === "celebration" && (
            <CelebrationScreen
              config={config}
              onRestart={restartGame}
              onOpenPersonalize={() => setIsPersonalizeOpen(true)}
              playCelebration={playCelebration}
              playPop={playPop}
            />
          )}
        </ScreenTransition>
      </div>

      {/* Footer Branding & Sweet Whisper */}
      <footer className="w-full text-center py-3 text-[11px] text-rose-400/80 font-medium select-none">
        <p>Crafted with 💖 for unforgettable moments</p>
      </footer>

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        config={config}
        onSave={updateConfig}
      />
    </main>
  );
}
