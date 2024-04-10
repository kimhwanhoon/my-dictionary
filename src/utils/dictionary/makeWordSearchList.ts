import ENGLISH_WORDS from "an-array-of-english-words";
import FRENCH_WORDS from "an-array-of-french-words";

export const makeWordSearchList = (
  currentLanguage: "en" | "en-fr" | "fr-en",
  inputValue: string
) => {
  const limitWordList = (language: "en" | "fr") => {
    const WORDS_LIST =
      language === "en"
        ? (ENGLISH_WORDS as string[])
        : (FRENCH_WORDS as string[]);
    const wordSearchList: string[] = WORDS_LIST.filter((word) =>
      word.startsWith(inputValue)
    );
    return wordSearchList.slice(0, 5);
  };

  switch (currentLanguage) {
    case "en":
      return limitWordList("en");
    case "en-fr":
      return limitWordList("en");
    case "fr-en":
      return limitWordList("fr");
    default:
      return [];
  }
};
