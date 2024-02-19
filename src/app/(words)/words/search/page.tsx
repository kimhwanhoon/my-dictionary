import React from "react";
import { SearchInput } from "./components/Input";
import { Divider } from "@nextui-org/react";
import { Result } from "./components/Result";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { splitArray } from "@/utils/pagination";

interface Props {
  searchParams: { q: string; error?: "true"; p: string };
}

const WordsSearchPage = async ({ searchParams }: Props) => {
  const query = searchParams.q || "";
  const isError = searchParams.error ? true : false;
  const currentPage = isNaN(Number(searchParams.p))
    ? 1
    : Number(searchParams.p);

  const searchDictionary = async () => {
    if (query === "") {
      return { data: null, error: false };
    }
    try {
      const supabase = createClient(cookies());
      const { data, error } = await supabase
        .from("french_dictionary")
        .select("word, definition, example")
        .ilike("word", `${query}%`);

      if (error) {
        redirect("/words/search?error=true");
      } else {
        const splittedData = data ? splitArray(data) : [];
        const totalPage = splittedData.length;
        return { error: false, data: { data: splittedData, totalPage } };
      }
    } catch (error) {
      redirect("/words/search?error=true");
    }
  };

  const { data, error } = await searchDictionary();

  if (error) {
    redirect("/words/search?error=true");
  }

  return (
    <div className="bg-white h-dvh p-4">
      <h1 className="text-center font-medium">Words Search Page</h1>
      <SearchInput />
      <Divider className="my-2" />
      <Result
        query={query}
        queryResult={data?.data!}
        totalPage={data?.totalPage!}
        currentPage={Number(currentPage)}
        error={isError}
      />
    </div>
  );
};

export default WordsSearchPage;
