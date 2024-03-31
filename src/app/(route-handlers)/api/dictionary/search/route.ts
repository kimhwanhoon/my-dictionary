import { searchDictionary } from "@/utils/dictionary/search";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

const searchWord = async (req: NextRequest) => {
  const { word, lang } = await req.json();
  if (!word || !lang) {
    return NextResponse.json({ error: true, data: null });
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
  const { entryContent: data } = await res.json();

  if (!data) {
    return NextResponse.json({ error: true, data: null });
  } else {
    return NextResponse.json({ error: false, data });
  }
};

export { searchWord as POST };
