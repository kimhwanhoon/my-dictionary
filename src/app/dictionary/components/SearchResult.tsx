"use client";

import { capitalizeFirstLetter } from "@/utils/dictionary/capitalizeFirstLetter";
import { extractPronunciation } from "@/utils/dictionary/extractPronunciation";
import { extractTextBetweenTags } from "@/utils/dictionary/extractTextBetweenTags";
import { removeTitle } from "@/utils/dictionary/removeTitle";
import { Buttons } from "./Buttons";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Props {
  search: string | null;
  lang: string;
}

export const SearchResult = ({ search, lang }: Props) => {
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

      // const data = await searchDictionary({ word: search, lang });
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

  return (
    <div
      className={`min-h-[calc(100dvh-212px)] flex flex-col p-4 pt-8 ${backgroundColor}`}
    >
      <section className="flex items-center justify-between ">
        {isSuccess && (
          <>
            <div className="flex gap-2 items-center">
              <h1 className="text-4xl font-semibold pr-2">
                {capitalizeFirstLetter(resultWord)}
              </h1>
              <span className="text-xs text-gray-700 dark:text-gray-200">
                [{pronunciation}]
              </span>
            </div>
            <Buttons word={resultWord as string} />
          </>
        )}
      </section>
      {isSuccess ? <>{parse(titleRemoved)}</> : <p>No result found.</p>}
    </div>
  );
};
// search not found
// returns
//{
// errorCode: 'InvalidDictionary',
// errorMessage: "Dictionary 'null' not found."
// }
