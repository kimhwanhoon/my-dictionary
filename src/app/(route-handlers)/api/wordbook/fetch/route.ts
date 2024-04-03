import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const fetchWordList = async (req: NextRequest) => {
  const { word } = await req.json();
  const { userData } = await checkUserSession();
  const uid = userData?.user?.id!;
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("my_words")
    .select("lists, words")
    .eq("author_id", uid)
    .single();

  if (error) {
    return NextResponse.json({ error, data: null });
  } else {
    const listsWhereWordResides =
      data?.words?.filter((wordObject) => wordObject.word === word) || [];

    if (listsWhereWordResides.length > 0) {
      const lists = data.lists.map(
        (list) => 
      );
      return NextResponse.json({ error: false, data: { ...data, listIds } });
    } else {
      return NextResponse.json({
        error: false,
        data: { ...data, listIds: [] },
      });
    }
  }
};

export { fetchWordList as POST };
