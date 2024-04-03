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
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { Key } from "react";

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

const toggleWordbookList = async ({
  word,
  originalDefinition,
  wordbookId,
  router,
}: {
  word: Props["word"];
  originalDefinition: Props["originalDefinition"];
  wordbookId: Key;
  router: AppRouterInstance;
}) => {
  const body = JSON.stringify({
    word,
    original_definition: originalDefinition,
    wordbookId,
  });

  try {
    const res = await fetch("/api/wordbook/add-or-remove-word", {
      method: "post",
      body,
    });
    const { error, data } = await res.json();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    router.refresh();
  }
};

export const AddToWordbookButton = ({
  word,
  originalDefinition,
  wordbookList,
}: Props) => {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" isIconOnly>
          <IconPlus />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={wordbookList}
        onAction={async (e: Key) => {
          await toggleWordbookList({
            word,
            originalDefinition,
            wordbookId: e,
            router,
          });
        }}
      >
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
