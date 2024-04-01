"use client";

import { block } from "@/utils/block";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

interface Props {
  word: string;
}

export const Buttons = ({ word }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const onClickHandler = async () => {
    setIsLoading(true);
    try {
      const body = JSON.stringify({ word });
      const res = await fetch("/api/dictionary/add-to-my-list", {
        body,
        method: "post",
      });
      const { data, error } = await res.json();

      if (error) {
        if (error === "duplicated") {
          console.log("duplicated. Not added to list.");
        }
        console.log(error);
        setIsError(true);
      } else {
        setIsAdded(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      await block(3000);
      setIsAdded(false);
      setIsError(false);
    }
  };
  return (
    <div>
      <Popover placement="top" isOpen={isAdded || isError} shadow="lg">
        <PopoverTrigger>
          <Button
            onClick={onClickHandler}
            size="sm"
            isIconOnly
            color="primary"
            isLoading={isLoading}
          >
            <IconPlus />
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          {isAdded ? (
            <span className="text-sm text-gray-600">Added! 🚀</span>
          ) : isError ? (
            <span className="text-sm text-gray-600">Error occurred! 😢</span>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
};
