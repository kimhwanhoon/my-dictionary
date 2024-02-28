import { WordCard } from "@/components/cards/WordCard";
import { WordType } from "@/types/supabaseMyWordsType";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const WordsList = async () => {
  try {
    const supabase = createClient(cookies());
    const userData = await supabase.auth.getUser();
    const uid = userData.data.user?.id;
    const { data, error } = await supabase
      .from("my_words")
      .select("words")
      .eq("author_id", uid!)
      .single();

    if (error) {
      return (
        <div>
          <p className="text-gray-400 text-sm text-center">
            Your word is empty.
          </p>
        </div>
      );
    } else {
      const words: any = data.words;

      return (
        <>
          {words.map((word: WordType) => (
            <WordCard
              key={word.word}
              word={word.word}
              definition={word.definition}
              example={word.example}
            />
          ))}
        </>
      );
    }
  } catch (error) {
    return <div></div>;
  }
};
