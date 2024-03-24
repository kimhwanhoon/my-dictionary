"use client";

import { Button } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

interface Props {
  word: string;
}

export const Buttons = ({ word }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      } else {
        console.log("added.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={onClickHandler}
        size="sm"
        isIconOnly
        color="primary"
        isLoading={isLoading}
      >
        <IconPlus />
      </Button>
    </div>
  );
};
