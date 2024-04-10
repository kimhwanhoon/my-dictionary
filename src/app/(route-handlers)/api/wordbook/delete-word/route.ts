import { WordType } from "@/types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const deleteWordFromWordbook = async (req: NextRequest) => {
  const { word, wordbookId } = await req.json();
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
    const updatedWordbookData = wordbookData.filter(
      (wordInDatabase: WordType) => wordInDatabase.word !== word
    );
    await supabase
      .from("wordbook")
      .update({ words: updatedWordbookData })
      .eq("user_id", uid)
      .eq("id", wordbookId);
    return NextResponse.json({ error: false, data: updatedWordbookData });
  }
};

export { deleteWordFromWordbook as POST };
