import React from "react";
import { SearchInput } from "./components/SearchInput";
import { SearchResult } from "./components/SearchResult";
import { Divider } from "@nextui-org/react";

interface Props {
  searchParams: { search: string | null };
}

const DictionaryPage = async ({ searchParams: { search } }: Props) => {
  return (
    <div className="p-4 ">
      <SearchInput />
      <Divider className="my-4" />
      <SearchResult search={search} />
    </div>
  );
};

export default DictionaryPage;
