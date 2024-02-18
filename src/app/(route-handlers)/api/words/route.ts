import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const insert = async (req: NextRequest) => {
  const formData = await req.formData();
  const word = formData.get("word") as string;
  const definition = (formData.get("definition") as string) || "";
  const example = (formData.get("example") as string) || "";

  const newWord = {
    word,
    definition,
    example,
  };

  const supabase = createClient(cookies());

  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id!;

  const { data: prevWordsData, error: selectError } = await supabase
    .from("my_words")
    .select("words")
    .eq("author_id", uid)
    .single();

  if (selectError) {
    // insert
    const dataToInsert = [newWord];

    const { error } = await supabase
      .from("my_words")
      .insert({ words: dataToInsert })
      .eq("author_id", uid);

    if (error) {
      return NextResponse.json({ error, message: "insert failed: words" });
    } else {
      return NextResponse.json({ error: null, message: "ok" });
    }
  } else {
    const dataToUpdate = prevWordsData.words!.concat(newWord);

    const { error } = await supabase
      .from("my_words")
      .update({ words: dataToUpdate })
      .eq("author_id", uid);

    if (error) {
      return NextResponse.json({ error, message: "insert failed: words" });
    } else {
      return NextResponse.json({ error: null, message: "ok" });
    }
  }
};

export { insert as POST };
