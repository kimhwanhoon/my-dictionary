import React from "react";
import { SearchInput } from "./components/SearchInput";
import { SearchResult } from "./components/SearchResult";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { search: string | null; lang: string };
}

const DictionaryPage = async ({ searchParams: { search, lang } }: Props) => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return (
      <div className="h-full dictionary-result-background">
        <SearchInput />
        <SearchResult search={search} lang={lang} />
      </div>
    );
  }
};

export default DictionaryPage;
