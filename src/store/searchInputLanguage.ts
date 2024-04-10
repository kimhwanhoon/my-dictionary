import { create } from "zustand";

interface searchInputLanguageStore {
  language: "en" | "en-fr" | "fr-en";
  setLanguage: (language: searchInputLanguageStore["language"]) => void;
}

const useSearchInputLanguageChanger = create<searchInputLanguageStore>(
  (set) => {
    return {
      language: "en",
      setLanguage: (language: searchInputLanguageStore["language"]) =>
        set({ language }),
    };
  }
);

export default useSearchInputLanguageChanger;
