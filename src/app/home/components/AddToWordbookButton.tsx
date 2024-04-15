"use client";

import { AddListButton } from "@/app/wordbook/components/AddListButton";
import { Database } from "@/types/supabaseTypes";
import { block } from "@/utils/block";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { Key, useEffect, useState } from "react";

type wordbookList = Array<
  Pick<Database["public"]["Tables"]["wordbook"]["Row"], "name" | "words" | "id">
>;

interface Props {
  word: string;
  originalDefinition: string;
  language: "English" | "French" | null;
}

const toggleWordbookList = async ({
  word,
  originalDefinition,
  wordbookId,
  router,
  language,
}: {
  word: Props["word"];
  originalDefinition: Props["originalDefinition"];
  wordbookId: Key;
  router: AppRouterInstance;
  language: Props["language"];
}) => {
  const body = JSON.stringify({
    word,
    original_definition: originalDefinition,
    wordbookId,
    language,
  });

  try {
    const res = await fetch("/api/wordbook/add-or-remove-word", {
      method: "post",
      body,
    });
    const { error, data } = await res.json();
    if (error) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  } finally {
    router.refresh();
  }
};

export const AddToWordbookButton = ({
  word,
  originalDefinition,
  language,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wordbookList, setWordbookList] = useState<any[]>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const getWordbookList = async () => {
      const res = await fetch("/api/wordbook/get-list");
      const { wordbookList } = await res.json();
      setWordbookList(wordbookList);
    };
    getWordbookList();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/auth/check-session");
      const { isSession } = await res.json();
      setIsSignedIn(isSession);
    };
    checkSession();
  }, []);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isLoading={loading} color="primary" isIconOnly>
          {isSuccess ? <IconCheck /> : <IconPlus />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        topContent={
          isSignedIn ? (
            <AddListButton fullWidth={false} size="sm" variant="ghost" />
          ) : (
            <Button onClick={() => router.push("/signin")}>Sign in</Button>
          )
        }
        aria-label="Dynamic Actions"
        items={(wordbookList as wordbookList) ?? []}
        onAction={async (e: Key) => {
          setLoading(true);
          const success = await toggleWordbookList({
            word,
            originalDefinition,
            wordbookId: e,
            router,
            language,
          });
          await block(500);
          setLoading(false);
          setIsSuccess(success);
          await block(2000);
          setIsSuccess(false);
        }}
        emptyContent={
          <p className="text-gray-600 dark:text-gray-200 text-[13px] text-center">
            No wordbook found.
          </p>
        }
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
