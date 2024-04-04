import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const addList = async (req: NextRequest) => {
  const { name }: { name: string } = await req.json();
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
    const uid = user?.id as string;

    const { error } = await supabase
      .from("wordbook")
      .select("*")
      .eq("user_id", uid);

    if (error) {
      return NextResponse.json({ error: true, message: error.message });
    } else {
      await supabase
        .from("wordbook")
        .insert([{ user_id: uid, name, words: [] }]);
      return NextResponse.json({ error: false, message: "new list created." });
    }
  }
};

export { addList as POST };
