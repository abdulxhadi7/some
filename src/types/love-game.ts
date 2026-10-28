export type GameScreen =
  | "welcome"
  | "quiz"
  | "confession"
  | "challenge"
  | "suspense"
  | "proposal"
  | "celebration";

export interface QuizQuestion {
  id: number;
  question: string;
  category?: string;
  options: {
    label: string;
    reaction: string;
    emoji?: string;
  }[];
}

export interface ChallengeState {
  smileCompleted: boolean;
  smileCount: number;
  truthAnswer: string | null;
  suspenseAnswer: string | null;
}

export interface LoveGameConfig {
  recipientName: string;
  senderName: string;
  websiteTitle: string;
  welcomeHeading: string;
  proposalQuestion: string;
  successHeading: string;
  finalMessage: string;
  primaryColor: string;
  accentColor: string;
  enableSound: boolean;
  enableBackgroundMusic: boolean;
  showPersonalizedNames: boolean;
}

export interface SoundState {
  isMuted: boolean;
  isMusicPlaying: boolean;
  hasUserInteracted: boolean;
}
