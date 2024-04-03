"use client";

import { Database } from "@/types/supabaseTypes";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface Props {
  word: string;
  originalDefinition: string;
  wordbookList: Array<
    Pick<
      Database["public"]["Tables"]["wordbook"]["Row"],
      "name" | "words" | "id"
    >
  >;
}

export const AddToWordbookButton = ({
  word,
  originalDefinition,
  wordbookList,
}: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" isIconOnly>
          <IconPlus />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={wordbookList}>
        {(wordbook) => {
          if (
            wordbook.words.some(
              (wordInDatabase) => wordInDatabase.word === word
            )
          ) {
            return (
              <DropdownItem
                key={wordbook.id}
                endContent={<Checkbox defaultSelected />}
              >
                {wordbook.name}
              </DropdownItem>
            );
          } else {
            return (
              <DropdownItem key={wordbook.id} endContent={<Checkbox />}>
                {wordbook.name}
              </DropdownItem>
            );
          }
        }}
      </DropdownMenu>
    </Dropdown>
  );
};
