import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface CookieType {
  word: string;
  language: string;
}

const saveWordFromCookies = async (req: NextRequest) => {
  const { word, language }: CookieType = await req.json();
  const cookieStore = cookies();

  if (word) {
    cookieStore.set("word", word);
    cookieStore.set("language", language);
    return NextResponse.json({ error: null });
  } else {
    return NextResponse.json({ error: "no word found" });
  }
};

const getWordFromCookies = async () => {
  const cookieStore = cookies();
  const word = cookieStore.get("word");
  const language = cookieStore.get("language");
  const wordValue = word?.value;
  const languageValue = language?.value;

  if (word) {
    return NextResponse.json({ word: wordValue, language: languageValue });
  } else {
    return NextResponse.json({ word: null, language: null });
  }
};

export { saveWordFromCookies as POST, getWordFromCookies as GET };
