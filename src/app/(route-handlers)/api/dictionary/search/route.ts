import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const searchDictionary = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const word = formData.get("word") as string;

    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from("french_dictionary")
      .select("word")
      .ilike("word", `${word}%`);

    if (error) {
      return NextResponse.json({ error, data });
    } else {
      return NextResponse.json({ error, data });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export { searchDictionary as POST };
