import { createClient } from "@/utils/supabase/server";
import { SearchInput } from "./components/SearchInput";
import { SearchResult } from "./components/SearchResult";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface Props {
  searchParams: { search: string | null; lang: string };
}

const HomePage = async ({ searchParams: { search, lang } }: Props) => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    const uid = userData?.user?.id!;
    const supabase = createClient(cookies());

    const { data: wordbookList, error } = await supabase
      .from("wordbook")
      .select("id,name, words")
      .eq("user_id", uid);

    if (error) {
      console.log(error);
      // add error handling later
    }

    return (
      <div className="h-full dictionary-result-background">
        <SearchInput />
        <SearchResult
          search={search}
          lang={lang}
          wordbookList={wordbookList ?? []}
        />
      </div>
    );
  }
};

export default HomePage;
