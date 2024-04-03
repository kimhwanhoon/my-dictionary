"use client";

import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface Props {
  word: string;
}

interface List {
  id: number;
  name: string;
}

interface WordObject {
  word: string;
  listId: number;
}

export const Buttons = ({ word }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [list, setList] = useState<List[]>([]);
  const [words, setWords] = useState<WordObject[]>([]);
  const [inWhatList, setInWhatList] = useState<number[]>([]);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const body = JSON.stringify({ word });
      const { error, data } = await fetch("/api/wordbook/fetch", {
        method: "post",
        body,
      }).then((res) => res.json());
      if (error) {
        throw new Error(error);
      }
      setList(data.lists);
      setWords(data.words);
      setInWhatList(data.listIds);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setInWhatList([]);
    };
  }, []);

  return (
    <div>
      <Popover placement="top" shadow="lg">
        <PopoverTrigger>
          <Button
            onClick={fetchList}
            size="sm"
            isIconOnly
            color="primary"
            isLoading={isLoading}
          >
            <IconPlus />
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="space-y-2 p-2 flex flex-col justify-center">
            {list.map((item) => {
              console.log(inWhatList.includes(item.id));
              return (
                <div key={item.id} className="flex gap-1">
                  <span>{item.name}</span>
                  <Checkbox defaultSelected={inWhatList.includes(item.id)} />
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
