import React from "react";
import { SearchResult } from "./SearchResult";

interface Props {
  search: string | null;
  lang: string;
}

export const SearchResultServer = ({ search, lang }: Props) => {
  return <SearchResult search={search} lang={lang} />;
};
