import { WordCard } from "@/components/cards/WordCard";
import { wordType } from "@/types/words";
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
      .eq("author_id", uid)
      .single();

    if (error) {
      console.log(error);
      return <span>Error fetching data</span>;
    } else {
      const words: wordType[] = data.words;
      const cards = words.map((word) => (
        <WordCard
          key={word.word}
          word={word.word}
          definition={word.definition}
          example={word.example}
        />
      ));
      return <>{cards}</>;
    }
    // const cards = data.map((el) => (
    //   <WordCard
    //     key={el.word}
    //     word={el.word}
    //     definition={el.definition}
    //     example={el.example}
    //   />
    // ));
    // return <div>{cards}</div>;
  } catch (error) {
    return <span>Error fetching data</span>;
  }
};
