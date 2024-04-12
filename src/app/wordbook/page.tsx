import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AddListButton } from "./components/AddListButton";
import { ListCard } from "./components/ListCard";
import { WordbookBackground } from "./components/Background";

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
      .eq("user_id", uid)
      .order("created_at", { ascending: true });

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
        <WordbookBackground className="p-4 h-[calc(100dvh-130px)]">
          <AddListButton />
          <section className="py-4 w-full gap-4 flex justify-start flex-wrap">
            {wordbook!.map((el, i) => {
              return (
                <ListCard key={i} title={el.name} number={el.words.length} />
              );
            })}
          </section>
        </WordbookBackground>
      );
    }
  }
};

export default WordbookPage;
