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
      .select("lists")
      .eq("author_id", uid)
      .single();

    if (error) {
      // user not yet made a list.
      await supabase
        .from("my_words")
        .insert([{ author_id: uid, lists: [{ id: 0, name }] }]);
      return NextResponse.json({ error: true, message: error.message });
    } else {
      // user already made a list.
      const lists = data.lists || [];
      lists.push({ id: lists.length, name });
      await supabase.from("my_words").update({ lists }).eq("author_id", uid);
      return NextResponse.json({ error: false, message: "List created." });
    }
  }
};

export { addList as POST };
