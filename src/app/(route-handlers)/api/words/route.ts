import { RouteReturnType } from "@/types/routeReturnTypes";
import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { select } from "./select";

const insert = async (req: NextRequest): Promise<RouteReturnType> => {
  const supabase = createClient(cookies());
  const { userData, sessionErrorMessage } = await checkUserSession();

  if (!userData) {
    return NextResponse.json({
      error: true,
      message: sessionErrorMessage,
    });
  }

  const uid = userData.user?.id!;

  const formData = await req.formData();
  const word = formData.get("word") as string;
  const definition = (formData.get("definition") as string) || "";
  const example = (formData.get("example") as string) || "";

  const newWord = {
    word,
    definition,
    example,
  };

  const {
    data: prevWordsData,
    error: selectError,
    errorMessage,
  } = await select({ supabase, uid });

  const wordExist: boolean = !!prevWordsData?.words!.some(
    (word_DB) => word_DB.word === word
  );

  if (wordExist) {
    console.log("word exists!");
    return NextResponse.json({
      error: true,
      message: "Word already exists.",
    });
  }

  if (selectError) {
    // insert - if there is no prior data
    const dataToInsert = [newWord];

    const { error } = await supabase
      .from("my_words")
      .insert({ words: dataToInsert })
      .eq("author_id", uid);

    if (error) {
      return NextResponse.json({
        error: true,
        message: "insert failed: words",
      });
    } else {
      return NextResponse.json({ error: null, message: "ok" });
    }
  } else {
    // update - if there is already data exist
    const dataToUpdate = prevWordsData.words!.concat(newWord);

    const { error } = await supabase
      .from("my_words")
      .update({ words: dataToUpdate })
      .eq("author_id", uid);

    if (error) {
      return NextResponse.json({
        error: true,
        message: "insert failed: words",
      });
    } else {
      return NextResponse.json({ error: null, message: "ok" });
    }
  }
};

export { insert as POST };
