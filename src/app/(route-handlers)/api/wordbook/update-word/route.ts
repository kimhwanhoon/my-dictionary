import { WordType } from "@/types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const updateWordFromWordbook = async (req: NextRequest) => {
  const { word, wordbookId, updatedDefinition } = await req.json();
  const { userData } = await checkUserSession();
  const uid = userData?.user?.id!;
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
    const updatedWordbookData: WordType[] = wordbookData.map(
      (wordInDatabase) => {
        if (wordInDatabase.word === word) {
          return {
            word,
            definition: updatedDefinition,
            original_definition: wordInDatabase.original_definition,
          };
        } else {
          return wordInDatabase;
        }
      }
    );
    await supabase
      .from("wordbook")
      .update({ words: updatedWordbookData })
      .eq("user_id", uid)
      .eq("id", wordbookId);
    return NextResponse.json({ error: false, data: updatedWordbookData });
  }
};

export { updateWordFromWordbook as POST };
