import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const fetchWordList = async (req: NextRequest) => {
  const { word: searchedWord } = await req.json();
  const { userData } = await checkUserSession();
  const uid = userData?.user?.id!;
  const supabase = createClient(cookies());

  const { data: wordbookList, error } = await supabase
    .from("wordbook")
    .select("name, words")
    .eq("author_id", uid);

  if (error) {
    return NextResponse.json({ error, data: null });
  } else {
    console.log(wordbookList);
  }
};

export { fetchWordList as POST };
