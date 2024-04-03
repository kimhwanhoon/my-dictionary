"use client";

import { capitalizeFirstLetter } from "@/utils/dictionary/capitalizeFirstLetter";
import { extractPronunciation } from "@/utils/dictionary/extractPronunciation";
import { extractTextBetweenTags } from "@/utils/dictionary/extractTextBetweenTags";
import { removeTitle } from "@/utils/dictionary/removeTitle";
import { AddToWordbookButton } from "./AddToWordbookButton";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { deleteText } from "@/utils/dictionary/deleteText";
import { replaceText } from "@/utils/dictionary/replaceText";
import { ScrollShadow } from "@nextui-org/react";
import { Database } from "@/types/supabaseTypes";

interface Props {
  search: string | null;
  lang: string;
  wordbookList: Array<
    Pick<
      Database["public"]["Tables"]["wordbook"]["Row"],
      "name" | "words" | "id"
    >
  >;
}

export const SearchResult = ({ search, lang, wordbookList }: Props) => {
  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  const [data, setData] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const body = JSON.stringify({ word: search, lang });
      const res = await fetch("/api/dictionary/search", {
        body,
        method: "post",
      });
      const { error, data } = await res.json();

      if (error) {
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
      }
      setData(data);
    };
    getData();
  }, [search, lang]);

  useEffect(() => {
    if (theme === "light") {
      setBackgroundColor("light-dictionary-result-background");
    } else {
      setBackgroundColor("dark-dictionary-result-background");
    }
  }, [theme]);
  const resultBefore: string = (isSuccess && data) ?? "";
  const resultWord = extractTextBetweenTags(resultBefore) ?? "";
  const pronunciation = extractPronunciation(resultBefore) ?? "";
  const titleRemoved = removeTitle(resultBefore) ?? "";
  const specialLetterRemoved = deleteText({
    originalText: titleRemoved,
    target: "▷",
  });
  const specialLetterRemoved2 = deleteText({
    originalText: specialLetterRemoved,
    target: "▶",
  });

  const specialLetterRemoved3 = deleteText({
    originalText: specialLetterRemoved2,
    target: ";",
  });

  const output = replaceText({
    originalText: specialLetterRemoved3,
    replacement: `<br/><span class="pl-5">■</span>`,
    target: "■",
  });

  const language: "English" | "French" | null =
    lang === "en"
      ? "English"
      : lang === "en-fr"
      ? "English"
      : lang === "fr-en"
      ? "French"
      : null;

  return (
    <ScrollShadow
      className={`h-[calc(100dvh-282px)] w-full ${backgroundColor}`}
      size={50}
    >
      <div className={`flex flex-col p-4 pt-8`}>
        <section className="flex items-center justify-between">
          {isSuccess && (
            <>
              <div className="flex gap-2 items-center space-x-1">
                <h1 className="text-4xl font-semibold">
                  {capitalizeFirstLetter(resultWord)}
                </h1>
                <div className="h-[40px] flex items-start">
                  <span>{language === "English" ? "🇬🇧" : "🇫🇷"}</span>
                </div>

                <span className="text-xs text-gray-700 dark:text-gray-200">
                  [{pronunciation}]
                </span>
              </div>
              <AddToWordbookButton
                word={resultWord as string}
                originalDefinition={output}
                wordbookList={wordbookList}
              />
            </>
          )}
        </section>
        {isSuccess ? (
          <>{parse(output)}</>
        ) : (
          // <div className="h-[calc(100vh-282px)]">
          <p>No result found.</p>
          // </div>
        )}
      </div>
    </ScrollShadow>
  );
};
