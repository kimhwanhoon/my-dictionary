import { searchDictionary } from "@/utils/dictionary/search";
import { findAudioSource } from "@/utils/regex/findAudioSource";
import parse from "html-react-parser";
import { Audio } from "./Audio";

interface Props {
  search: string | null;
  lang: string;
}

export const SearchResult = async ({ search, lang }: Props) => {
  const data = await searchDictionary({ word: search, lang });
  // return <>testing...</>;
  if (!data || data.errorCode) {
    return (
      <section className="p-4 text-center dictionary-result-background">
        No result found.
      </section>
    );
  } else {
    return (
      <section className="flex flex-col p-4 dictionary-result-background">
        {parse(data.entryContent)}
      </section>
    );
  }
};
// search not found
// returns
//{
// errorCode: 'InvalidDictionary',
// errorMessage: "Dictionary 'null' not found."
// }
