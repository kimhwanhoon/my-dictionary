import { SearchInput } from "./components/SearchInput";
import { SearchResult } from "./components/SearchResult";
import { SearchResultServer } from "./components/SearchResultServer";

interface Props {
  searchParams: { search: string | null; lang: string };
}

const HomePage = async ({ searchParams: { search, lang } }: Props) => {
  return (
    <div className="h-full">
      <SearchInput />
      <SearchResultServer lang={lang} search={search} />
    </div>
  );
};

export default HomePage;
