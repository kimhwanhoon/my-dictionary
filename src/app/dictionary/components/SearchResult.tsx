import { searchDictionary } from "@/utils/dictionary/search";
import parse from "html-react-parser";

interface Props {
  search: string | null;
  lang: string;
}

export const SearchResult = async ({ search, lang }: Props) => {
  // const data = await searchDictionary({ word: search, lang });
  return <>testing...</>;
  if (!data || data.errorCode) {
    return <section>No result found.</section>;
  } else {
    return <section>{parse(data.entryContent)}</section>;
  }
};
// search not found
// returns
//{
// errorCode: 'InvalidDictionary',
// errorMessage: "Dictionary 'null' not found."
// }
