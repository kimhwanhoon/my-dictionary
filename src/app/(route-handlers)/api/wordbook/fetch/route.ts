import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const fetchWordList = async () => {
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
    return NextResponse.json({ error: false, data: data });
  }
};

export { fetchWordList as GET };
