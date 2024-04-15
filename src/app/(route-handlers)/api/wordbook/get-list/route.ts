import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const getWordbookList = async () => {
  const { isSession, userData } = await checkUserSession();

  if (!isSession) {
    return NextResponse.json({ wordbookList: [] });
  } else {
    const uid = userData?.user?.id;
    const supabase = createClient(cookies());

    const { data: wordbookList, error } = await supabase
      .from("wordbook")
      .select("id,name, words")
      .eq("user_id", uid!);

    if (error) {
      return NextResponse.json({ wordbookList: [] });
    }

    return NextResponse.json({ wordbookList });
  }
};

export { getWordbookList as GET };
