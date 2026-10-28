import { LoveGameConfig, QuizQuestion } from "@/types/love-game";

export const defaultGameConfig: LoveGameConfig = {
  recipientName: "My Favorite Human",
  senderName: "Your Secret Admirer",
  websiteTitle: "Will You Be Mine? 💗 | A Special Question",
  welcomeHeading: "Hey You. Yes, YOU. 💗",
  proposalQuestion: "WILL YOU BE MINE? 💍",
  successHeading: "WAIT... YOU SAID YES?! 💖",
  finalMessage: "Congratulations! You've officially made someone's day. 💗",
  primaryColor: "#E11D48", // Cherry red
  accentColor: "#F472B6", // Soft pink
  enableSound: true,
  enableBackgroundMusic: false,
  showPersonalizedNames: true,
};

export const compatibilityQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your current relationship status?",
    options: [
      {
        label: "Single and fabulous.",
        reaction: "Iconic. But let's see how long that fabulous status survives today. 😉",
        emoji: "💅",
      },
      {
        label: "Complicated. Don't ask.",
        reaction: "Oof. We've all been there. Time to un-complicate it right now. 🧘",
        emoji: "🌀",
      },
      {
        label: "Taken by the most annoying person ever.",
        reaction: "Annoying is just secret code for 'I love them so much it hurts'. 🥰",
        emoji: "🙄",
      },
      {
        label: "Emotionally committed to my bed. 🛏️",
        reaction: "High standards! A warm fluffy bed is honestly tough competition. 🛌",
        emoji: "😴",
      },
    ],
  },
  {
    id: 2,
    question: "What's your biggest green flag?",
    options: [
      {
        label: "I care too much.",
        reaction: "A huge glowing green flag! Empathy is an actual superpower. 💚",
        emoji: "🌱",
      },
      {
        label: "I'm secretly a softie.",
        reaction: "A secret softie hiding behind a tough exterior? Too precious. 🥺",
        emoji: "🧸",
      },
      {
        label: "I make people laugh.",
        reaction: "Humor is 90% of attraction anyway. Top tier answer! 😂",
        emoji: "✨",
      },
      {
        label: "I pretend I don't care, but I do.",
        reaction: "Classic tsundere energy! We see right through your poker face. 🔍",
        emoji: "🕶️",
      },
    ],
  },
  {
    id: 3,
    question: "What's your biggest red flag?",
    options: [
      {
        label: "Overthinking everything.",
        reaction: "Ah yes, professional detective with absolutely no evidence. 🕵️",
        emoji: "🧠",
      },
      {
        label: "Replying late but being online.",
        reaction: "Jail. Straight to relationship jail with no bail! 🚨",
        emoji: "📱",
      },
      {
        label: "Saying 'nothing' when something is definitely wrong.",
        reaction: "Translation: You have 3 seconds to guess what you did wrong. ⏳",
        emoji: "🤐",
      },
      {
        label: "Stealing fries without asking.",
        reaction: "Criminal behavior detected. Relationship material? Under investigation. 🍟",
        emoji: "🍟",
      },
    ],
  },
  {
    id: 4,
    question: "What's your love language?",
    options: [
      {
        label: "Quality time.",
        reaction: "Just two humans existing in the same orbit. Pure, cozy perfection. 🌌",
        emoji: "⏳",
      },
      {
        label: "Food. Obviously.",
        reaction: "The fastest way to your heart is literally through your stomach. 🍕",
        emoji: "🍕",
      },
      {
        label: "Constant attention.",
        reaction: "Give me attention or give me... well, give me attention! 👑",
        emoji: "👑",
      },
      {
        label: "Teasing someone until they fall in love.",
        reaction: "The middle school playground romance method! Highly effective. 🏹",
        emoji: "😜",
      },
    ],
  },
];

export const confessionQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Have you ever smiled at your phone because of someone?",
    options: [
      {
        label: "Maybe... 👀",
        reaction: "That 'maybe' sounds suspiciously like a 100% YES.",
      },
      {
        label: "Okay, yes.",
        reaction: "Honesty looks good on you. And that smile looks even better.",
      },
      {
        label: "I refuse to answer without a lawyer.",
        reaction: "The jury finds you guilty of adorable suspicious behavior! 👩‍⚖️",
      },
      {
        label: "Next question immediately!",
        reaction: "Deflecting already? Someone's cheeks are getting pink! 😳",
      },
    ],
  },
  {
    id: 2,
    question: "Do you believe two people can become each other's favorite person?",
    options: [
      {
        label: "Absolutely.",
        reaction: "Believing in it is the first step toward living it. 💫",
      },
      {
        label: "Depends on the person.",
        reaction: "Fair point. Good thing someone special is trying hard. ✨",
      },
      {
        label: "That's suspiciously specific.",
        reaction: "Wait until you see how specific this whole game gets... 😏",
      },
      {
        label: "Why are you asking me this? 🤨",
        reaction: "You'll find out very soon. Keep going! 🤫",
      },
    ],
  },
  {
    id: 3,
    question: "If someone really liked you, what would matter most?",
    options: [
      {
        label: "Honesty.",
        reaction: "Pure truth and real intentions. Nothing beats genuine hearts.",
      },
      {
        label: "Effort.",
        reaction: "Consistency and effort speak louder than a thousand words. 🌟",
      },
      {
        label: "Feeling safe and understood.",
        reaction: "A sanctuary where you can be totally, unapologetically yourself. 🕊️",
      },
      {
        label: "Making me laugh even on bad days.",
        reaction: "Laughter heals everything. Prepare for a lifetime of goofy jokes. 😂",
      },
    ],
  },
  {
    id: 4,
    question: "Would you rather have a fancy date or a simple day with someone special?",
    options: [
      {
        label: "Fancy date. Spoil me.",
        reaction: "Candlelight, great outfits, and romantic vibes on lock! 🕯️",
      },
      {
        label: "Simple day together.",
        reaction: "Cozy sweatpants, walks, and laughing at inside jokes. The best kind. ☕",
      },
      {
        label: "Both. I'm not choosing.",
        reaction: "Why compromise when you deserve the whole universe? 👑",
      },
      {
        label: "Just bring food and we're good.",
        reaction: "A realistic romantic! Good food plus good company = peak happiness. 🌮",
      },
    ],
  },
];

export const funnyRejectionMessages: string[] = [
  "Excuse me??? 😭 Let's try that again.",
  "That button seems to be experiencing commitment issues. 😂",
  "Are you sure? The YES button is looking very convincing right now. 👀",
  "Plot twist: this game has excellent taste in answers. 💅",
  "Okay, okay... I'll stop being dramatic. Probably.",
  "Nice reflex, but destiny cannot be dodged that easily! ⚡",
  "Error 404: 'No' option temporarily unavailable due to overwhelming chemistry. 🧪",
  "My heart did a backflip. Please hit the pink button before it passes out! 💓",
  "The button is playing hard to get, just like someone I know. 😉",
  "Listen closely... even your cursor is trying to click YES! 🏹",
];
