import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AddListButton } from "./components/AddListButton";

const WordbookPage = async () => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    const uid = userData?.user.id!;
    const supabase = createClient(cookies());

    const { data: my_words, error } = await supabase
      .from("my_words")
      .select("*")
      .eq("author_id", uid)
      .single();

    if (error || !my_words.lists) {
      return (
        <div className="w-full h-full flex-col flex justify-center items-center">
          <div className="space-y-2">
            <p className="text-xl">Your list is empty.</p>
            <AddListButton />
          </div>
        </div>
      );
    } else {
      return <div>{JSON.stringify(my_words)}</div>;
    }
  }
};

export default WordbookPage;
