import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const addToMyList = async (req: NextRequest) => {
  const { word } = await req.json();
  const supabase = createClient(cookies());
  const { userData } = await checkUserSession();
  const userId = userData?.user.id;

  const { data, error } = await supabase
    .from("my_words")
    .select("words")
    .eq("author_id", userId)
    .single();

  const words: string[] = data?.words;
  // duplicate check
  if (words.includes(word)) {
    return NextResponse.json({ data: null, error: "duplicated" });
  }

  // update
  words.push(word);
  const { error: updateError } = await supabase
    .from("my_words")
    .update({ words })
    .eq("author_id", userId);

  if (updateError) {
    console.log(updateError);
  } else {
    return NextResponse.json({ data: "ok", error: null });
  }

  return NextResponse.json({ data: words, error });
};

export { addToMyList as POST };
