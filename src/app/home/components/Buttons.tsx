"use client";

import { block } from "@/utils/block";
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
  const [toBeChecked, setToBeChecked] = useState<{
    listId: number;
    check: boolean;
  } | null>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const { error, data } = await fetch("/api/wordbook/fetch").then((res) =>
        res.json()
      );
      if (error) {
        throw new Error(error);
      }
      setList(data.lists);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

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
              return (
                <div key={item.id} className="flex gap-1">
                  <span>{item.name}</span>
                  <Checkbox defaultSelected />
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
