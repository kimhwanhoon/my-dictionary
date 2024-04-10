export type Language = "en" | "en-fr" | "fr-en";

interface LanguageType {
  key: "en" | "en-fr" | "fr-en";
  title: string;
  desc: string;
  icon: string;
}

const languages: LanguageType[] = [
  {
    key: "en",
    title: "English",
    desc: "🇬🇧",
    icon: "🇬🇧",
  },
  {
    key: "en-fr",
    title: "English -> French",
    desc: "🇬🇧 -> 🇫🇷",
    icon: "🇫🇷",
  },
  {
    key: "fr-en",
    title: "French -> English",
    desc: "🇫🇷 -> 🇬🇧",
    icon: "🇫🇷",
  },
];
