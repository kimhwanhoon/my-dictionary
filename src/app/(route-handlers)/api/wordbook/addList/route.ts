import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const addList = async (req: NextRequest) => {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({
      error: true,
      message: "List name is required.",
    });
  } else {
    const supabase = createClient(cookies());
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const uid = user?.id || "";

    const { data, error } = await supabase
      .from("my_words")
      .insert({ lists: { name, words: [] } })
      .eq("author_id", uid);

    if (error) {
      return NextResponse.json({ error: true, message: error.message });
    } else {
      return NextResponse.json({ error: false, message: "List created." });
    }
  }
};

export { addList as POST };
