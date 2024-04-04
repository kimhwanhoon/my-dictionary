import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { AddWordButton } from "../components/AddWordButton";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";
import { WordCard } from "../components/WordCard";
import { WordType } from "@/types/supabaseTypes";

interface Props {
  params: { name: string };
}

const WordbookDetailPage = async ({ params: { name } }: Props) => {
  // in case the name of the list is not English.
  // decode the name of the list so it can have a clear value.
  const listName = decodeURIComponent(name);
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    const uid = userData?.user.id!;
    const supabase = createClient(cookies());

    const { data: wordbook } = await supabase
      .from("wordbook")
      .select("*")
      .eq("user_id", uid)
      .eq("name", listName)
      .single();

    if (wordbook && wordbook?.words.length === 0) {
      // no list is added.
      return (
        <div className="w-full h-full flex-col flex justify-center items-center p-4">
          <div className="space-y-2">
            <p className="text-xl">Your list is empty.</p>
            <AddWordButton listName={listName} />
          </div>
        </div>
      );
    } else if (!wordbook) {
      // no list is added.
      return (
        <div className="w-full h-full flex-col flex justify-center items-center p-4">
          <div className="space-y-2">
            <p className="text-xl">No list found.</p>
            <Link href={"/wordbook"}>
              <Button color="primary" fullWidth>
                Go back
              </Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-4 space-y-4 flex flex-col items-center">
          <AddWordButton listName={listName} />
          {wordbook.words.map((el: WordType, i) => {
            return (
              <WordCard
                key={i.toString()}
                word={el.word}
                definition={el.definition}
                originalDefinition={el.original_definition}
              />
            );
          })}
        </div>
      );
    }
  }
};

export default WordbookDetailPage;
