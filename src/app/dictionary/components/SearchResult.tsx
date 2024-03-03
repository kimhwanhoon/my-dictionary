import { searchDictionary } from "@/utils/dictionary/search";
import { betterHTML } from "@/utils/regex/dictionaryResult";
import React from "react";

interface Props {
  search: string | null;
}

export const SearchResult = async ({ search }: Props) => {
  const data = await searchDictionary({ word: search });
  const pageId: number = data?.query?.search[0]?.pageid ?? null;
  const resultHTML = data?.query?.pages[pageId]?.extract ?? "";
  console.log(resultHTML);
  const output = betterHTML(resultHTML);

  return (
    <div>
      {search && (
        <h3 className="text-15 text-gray-500">
          Showing result for {`"${search}"`}
        </h3>
      )}
      {resultHTML && (
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      )}
      {!resultHTML && <p>No result found.</p>}
    </div>
  );
};
