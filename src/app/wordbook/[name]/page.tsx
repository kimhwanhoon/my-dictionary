import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: { name: string };
}

async function fetchWords(name: string) {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  }

  const uid = userData?.user.id!;
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("my_words")
    .select("lists, words")
    .eq("author_id", uid)
    .single();

  if (error) {
    console.error(error);
    return [];
  }

  const lists = data?.lists;
  const words = data?.words;

  if (!lists || !words) {
    return [];
  }

  const output = lists
    .filter((list) => list.name === name)
    .flatMap((list) =>
      words.filter((wordObject) => wordObject.listId === list.id)
    )
    .map((wordObject) => wordObject.word);

  return output;
}

const SingleWordbookPage = async ({ params: { name } }: Props) => {
  const wordsList = await fetchWords(name);

  if (wordsList.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-xl font-medium font-mono">No list found.</p>
      </div>
    );
  }

  return (
    <div>
      {wordsList.map((word, index) => (
        <p key={index}>{word}</p>
      ))}
    </div>
  );
};

export default SingleWordbookPage;
