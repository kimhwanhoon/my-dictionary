"use client";

import { removeAccents } from "@/utils/regex/removeAccents";
import { Input, Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
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

      const limitWords = result.slice(0, 20);
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

      {filteredItems.length === 0 ? (
        <ScrollShadow
          key={"scrollShadow"}
          className="w-full h-[0px] animate-500"
          size={30}
        ></ScrollShadow>
      ) : filteredItems.length === 1 ? (
        <ScrollShadow
          key={"scrollShadow"}
          className="w-full h-[50px] animate-500"
          size={30}
        >
          <Listbox
            className="flex flex-col gap-2 p-2"
            onAction={(key) => setInputValue(key as string)}
            shouldFocusWrap
          >
            {filteredItems.map((word) => (
              <ListboxItem
                key={word}
                className=" text-sm text-gray-600"
                onClick={() => setInputValue(word)}
              >
                {word}
              </ListboxItem>
            ))}
          </Listbox>
        </ScrollShadow>
      ) : filteredItems.length < 4 ? (
        <ScrollShadow
          key={"scrollShadow"}
          className="w-full h-[100px] animate-500"
          size={30}
        >
          <Listbox
            className="flex flex-col gap-2 p-2"
            onAction={(key) => setInputValue(key as string)}
            shouldFocusWrap
          >
            {filteredItems.map((word) => (
              <ListboxItem
                key={word}
                className=" text-sm text-gray-600"
                onClick={() => setInputValue(word)}
              >
                {word}
              </ListboxItem>
            ))}
          </Listbox>
        </ScrollShadow>
      ) : (
        <ScrollShadow
          key={"scrollShadow"}
          className="w-full h-[175px] animate-500"
          size={30}
        >
          <Listbox
            className="flex flex-col gap-2 p-2"
            onAction={(key) => setInputValue(key as string)}
            shouldFocusWrap
          >
            {filteredItems.map((word) => (
              <ListboxItem
                key={word}
                className=" text-sm text-gray-600"
                onClick={() => setInputValue(word)}
              >
                {word}
              </ListboxItem>
            ))}
          </Listbox>
        </ScrollShadow>
      )}
    </div>
  );
};
