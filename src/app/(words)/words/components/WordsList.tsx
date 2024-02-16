import { WordCard } from "@/components/cards/WordCard";
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
      .eq("author_id", uid);

    if (error) {
      console.log(error);
      return <span>Error fetching data</span>;
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
