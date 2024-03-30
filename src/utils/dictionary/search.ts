import { env } from "process";

interface SearchProps {
  word: string | null;
  lang: string;
}

export const searchDictionary = async ({ word, lang }: SearchProps) => {
  if (!word || !lang) {
    return false;
  }
  const API_URL = env.COLLINS_DICTIONARY_URL;
  const API_KEY = env.COLLINS_DICTIONARY_API_KEY || "";

  const language =
    lang === "en"
      ? "english"
      : lang === "en-fr"
      ? "english-french"
      : lang === "fr-en"
      ? "french-english"
      : null;

  const API_URL2 = `/${language}/search/first/?q=${word}&format=html`;

  const requestURL = API_URL + API_URL2;

  const res = await fetch(requestURL, {
    headers: {
      accept: "application/json",
      accessKey: API_KEY,
      hotname: "http://localhost:3000",
    },
  });
  console.log(requestURL);
  const data = await res.json();
  console.log(data);

  return data;
};
