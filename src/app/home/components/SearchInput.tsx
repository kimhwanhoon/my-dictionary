"use client";

import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { SelectLanguage } from "./SelectLanguage";
import { debounce } from "lodash";
import { useTheme } from "next-themes";
import useSearchInputLanguageChanger from "@/store/searchInputLanguage";
import { makeWordSearchList } from "@/utils/dictionary/makeWordSearchList";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("lang");
  const currentWord = searchParams.get("search") ?? "";
  const { theme } = useTheme();
  const [backgroundStyle, setBackgroundStyle] = useState<string>("");
  const { language, setLanguage } = useSearchInputLanguageChanger();

  useEffect(() => {
    switch (currentLanguage) {
      case "en":
        setLanguage("en");
        break;
      case "en-fr":
        setLanguage("en-fr");
        break;
      case "fr-en":
        setLanguage("fr-en");
        break;
      default:
        setLanguage("en");
    }
  }, [currentLanguage, setLanguage]);

  useEffect(() => {
    if (theme === "light") {
      setBackgroundStyle("light-search-input-bg");
    } else {
      setBackgroundStyle("dark-search-input-bg");
    }
  }, [theme]);

  const [inputValue, setInputValue] = useState<string>(currentWord);
  const [searchedWordList, setSearchedWordList] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.length > 1) {
      const searchedWordList = makeWordSearchList(
        language as "en" | "en-fr" | "fr-en",
        inputValue
      );

      setSearchedWordList((prev) => {
        return searchedWordList as string[];
      });
    } else {
      setSearchedWordList([]);
    }
  }, [inputValue, language]);

  const onSubmitHandler = debounce(() => {
    router.push(`/home?lang=${language}&search=${inputValue.toLowerCase()}`);
  }, 1000);

  return (
    <form
      className={`flex flex-col gap-2 p-6 ${backgroundStyle}`}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitHandler();
      }}
    >
      <Input
        label={"Search words"}
        value={inputValue}
        onChange={(e) =>
          setInputValue((prev) => {
            const loweredWord = e.target.value.toLowerCase();
            return loweredWord;
          })
        }
        endContent={<SelectLanguage />}
      />
      {searchedWordList.length > 1 && (
        <div>
          <Listbox
            color="primary"
            aria-label="Actions"
            onAction={(key) => {
              setInputValue(key as string);
              setSearchedWordList([]);
            }}
          >
            {searchedWordList.map((word) => (
              <ListboxItem key={word}>{word}</ListboxItem>
            ))}
          </Listbox>
        </div>
      )}
      <Button color="primary" fullWidth size="md" type="submit">
        Search
      </Button>
    </form>
  );
};
