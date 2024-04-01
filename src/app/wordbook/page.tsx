import { createClient } from "@/utils/supabase/server";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AddListButton } from "./components/AddListButton";
import { ListCard } from "./components/ListCard";
import { countWordsByListId } from "@/utils/dictionary/list/countWordsByListId";

const WordbookPage = async () => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    const uid = userData?.user.id!;
    const supabase = createClient(cookies());

    const { data: my_words, error } = await supabase
      .from("my_words")
      .select("lists")
      .eq("author_id", uid)
      .single();

    const { data: words, error: error2 } = await supabase
      .from("my_words")
      .select("words")
      .eq("author_id", uid)
      .single();

    if (error || !my_words.lists) {
      return (
        <div className="w-full h-full flex-col flex justify-center items-center p-4">
          <div className="space-y-2">
            <p className="text-xl">Your list is empty.</p>
            <AddListButton />
          </div>
        </div>
      );
    } else {
      const wordCount = countWordsByListId(words?.words || []);

      return (
        <div className="p-4 space-y-4 flex flex-col items-center">
          <AddListButton />
          {my_words.lists.map((el) => (
            <ListCard
              key={el.id}
              title={el.name}
              number={wordCount[el.id] || 0}
            />
          ))}
        </div>
      );
    }
  }
};

export default WordbookPage;
