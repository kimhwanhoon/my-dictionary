import { WordType } from "@/types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const addWord = async (req: NextRequest) => {
  const {
    word: newWordValue,
    listName,
    definition,
    original_definition,
    language,
  } = await req.json();

  if (!newWordValue) {
    return NextResponse.json({
      error: true,
      message: "word is empty.",
    });
  } else {
    const supabase = createClient(cookies());
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const uid = user?.id as string;

    const { data: wordbook } = await supabase
      .from("wordbook")
      .select("words")
      .eq("user_id", uid)
      .eq("name", listName)
      .single();

    if (
      wordbook?.words.some(
        (wordInDatabase: WordType) => wordInDatabase.word === newWordValue
      )
    ) {
      return NextResponse.json({
        error: true,
        message: "word already exists.",
      });
    } else {
      const toBeUpdated = {
        word: newWordValue,
        definition,
        original_definition: original_definition || null,
        language,
      };
      await supabase
        .from("wordbook")
        .update({ words: [...wordbook!.words, toBeUpdated] })
        .eq("user_id", uid)
        .eq("name", listName);
      return NextResponse.json({ error: false, message: "word added." });
    }
  }
};

export { addWord as POST };
