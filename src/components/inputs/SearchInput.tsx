"use client";

import { removeAccents } from "@/utils/regex/removeAccents";
import { Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const words_french: string[] = require("an-array-of-french-words");

interface Props {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({ inputValue, setInputValue }: Props) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.length === 0) {
      setFilteredItems([]);
    } else {
      const result: string[] = [];
      words_french.forEach((originalWord) => {
        const simplifiedOriginalWord = removeAccents(originalWord);
        const simplifiedInputValue = removeAccents(inputValue);
        if (simplifiedOriginalWord.startsWith(simplifiedInputValue)) {
          result.push(originalWord);
        }
      });

      const limitWords = result.slice(0, 5);
      setFilteredItems(limitWords);
    }
  }, [inputValue]);

  return (
    <div className="w-full">
      <Input
        type="text"
        label="Word"
        placeholder="Enter your word"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {filteredItems.length === 0 ? null : (
        <div className="flex flex-col gap-2 p-2">
          {filteredItems.map((word) => (
            <p
              key={word}
              className="hover:bg-slate-50 active:bg-slate-50 text-sm text-gray-600"
              onClick={() => setInputValue(word)}
            >
              {word}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
