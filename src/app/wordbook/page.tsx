import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AddListButton } from "./components/AddListButton";
import { ListCard } from "./components/ListCard";

const WordbookPage = async () => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    const uid = userData?.user.id!;
    const supabase = createClient(cookies());

    const { data: wordbook } = await supabase
      .from("wordbook")
      .select("*")
      .eq("user_id", uid);

    if (wordbook!.length === 0) {
      // no list is added.
      return (
        <div className="w-full h-full flex-col flex justify-center items-center p-4">
          <div className="space-y-2">
            <p className="text-xl">Your list is empty.</p>
            <AddListButton />
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-4 space-y-4 flex flex-col items-center">
          <AddListButton />
          {wordbook!.map((el, i) => {
            return (
              <ListCard key={i} title={el.name} number={el.words.length} />
            );
          })}
        </div>
      );
    }
  }
};

export default WordbookPage;
