import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "DevJourney",
  description:
    "Interactive platform for learning programming with lessons, quizzes, coding practice, and progress tracking.",
  keywords: [
    "DevJourney",
    "learn programming",
    "coding lessons",
    "quizzes",
    "progress tracking",
    "interactive learning",
    "reactjs",
    "nextjs",
    "typescript",
    
    "tailwindcss",
  ] as Array<string>,
  authors: {
    name: "DevJourney Team",
    url: "https://github.com/your-repo", // <- replace with your GitHub repo
  },
} as const;

export const links = {
  sourceCode: "https://github.com/your-repo", // <- replace with your repo link
  email: "your-email@example.com", // <- replace with your email
} as const;
