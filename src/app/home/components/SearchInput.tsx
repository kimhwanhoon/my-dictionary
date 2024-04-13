"use client";

import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { SelectLanguage } from "./SelectLanguage";
import { debounce } from "lodash";
import { useTheme } from "next-themes";
import useSearchInputLanguageChanger from "@/store/searchInputLanguage";
import { makeWordSearchList } from "@/utils/dictionary/makeWordSearchList";
import { IconChevronDown, IconX } from "@tabler/icons-react";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("lang");
  const currentWord = searchParams.get("search") ?? "";
  const { theme } = useTheme();
  const [backgroundStyle, setBackgroundStyle] = useState<string>("");
  const { language, setLanguage } = useSearchInputLanguageChanger();

  const [isListClosed, setIsListClosed] = useState<boolean>(false);

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

  const onSubmitHandler = debounce(async () => {
    const saveWordToCookies = async (word: string, language: string) => {
      const body = JSON.stringify({ word, language });
      await fetch("/api/dictionary/data", {
        body,
        method: "post",
      });
    };

    await saveWordToCookies(inputValue, language);
    router.push(`/home?lang=${language}&search=${inputValue.toLowerCase()}`);
  }, 1000);

  useEffect(() => {
    const getDataFromCookies = async () => {
      const response = await fetch("/api/dictionary/data");
      const data = await response.json();
      const { word } = data;
      if (word) {
        setInputValue(word);
      }
    };
    getDataFromCookies();
  }, []);

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
        <div className="relative">
          <div className="h-6">
            {!isListClosed ? (
              <IconX
                className="z-10 absolute right-1 top-1 text-gray-800 opacity-50 hover:opacity-90 duration-300 ease-in-out cursor-pointer"
                onClick={() => setIsListClosed(true)}
              />
            ) : (
              <IconChevronDown
                className="z-10 absolute right-1 top-1 text-gray-800 opacity-50 hover:opacity-90 duration-300 ease-in-out cursor-pointer"
                onClick={() => setIsListClosed(false)}
              />
            )}
          </div>

          {!isListClosed && (
            <Listbox
              color="primary"
              aria-label="Actions"
              onAction={(key) => {
                setInputValue(key as string);
                setSearchedWordList([]);
                setIsListClosed(false);
              }}
            >
              {searchedWordList.map((word) => (
                <ListboxItem key={word}>{word}</ListboxItem>
              ))}
            </Listbox>
          )}
        </div>
      )}
      <Button color="primary" fullWidth size="md" type="submit">
        Search
      </Button>
    </form>
  );
};
