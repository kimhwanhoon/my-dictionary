import { WordType } from "@/types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const addOrDeleteWordFromWordbook = async (req: NextRequest) => {
  const { userData } = await checkUserSession();
  const uid = userData?.user?.id!;
  const {
    word,
    original_definition,
    wordbookId,
    language,
  }: {
    word: string;
    original_definition: string;
    wordbookId: string;
    language: "English" | "French";
  } = await req.json();

  const supabase = createClient(cookies());

  const { data: fetchedWordbookData, error: wordbookFetchError } =
    await supabase
      .from("wordbook")
      .select("words")
      .eq("user_id", uid)
      .eq("id", wordbookId)
      .single();

  if (wordbookFetchError) {
    return NextResponse.json({ error: wordbookFetchError, data: null });
  } else {
    const wordbookData = fetchedWordbookData.words;
    const wordExists = wordbookData.some(
      (wordInDatabase: WordType) => wordInDatabase.word === word
    );

    if (wordExists) {
      // if word exists in the wordbook, delete it
      const updatedWordbookData = wordbookData.filter(
        (wordInDatabase: WordType) => wordInDatabase.word !== word
      );
      await supabase
        .from("wordbook")
        .update({ words: updatedWordbookData })
        .eq("user_id", uid)
        .eq("id", wordbookId);
      return NextResponse.json({ error: false, data: updatedWordbookData });
    } else {
      // if word does not exist in the wordbook, add it
      const newWord: WordType = {
        word,
        definition: null,
        original_definition,
        language,
      };
      await supabase
        .from("wordbook")
        .update({ words: [...wordbookData, newWord] })
        .eq("user_id", uid)
        .eq("id", wordbookId);
      return NextResponse.json({
        error: false,
        data: [...wordbookData, newWord],
      });
    }
  }
};

export { addOrDeleteWordFromWordbook as POST };
