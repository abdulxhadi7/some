import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Will You Be Mine? 💗 | A Special Question For You",
  description:
    "A playful, romantic, and interactive couple proposal game. Someone has an unforgettable question just for you!",
  keywords: [
    "couple proposal",
    "will you be mine",
    "interactive love game",
    "romantic quiz",
    "valentines",
  ],
  openGraph: {
    title: "Will You Be Mine? 💗",
    description:
      "A playful interactive love game and a question you will never forget.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💗</text></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF0F5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FFFDFB] text-[#4C0519] selection:bg-rose-200">
        {children}
      </body>
    </html>
  );
}
