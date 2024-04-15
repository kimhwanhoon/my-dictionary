import { SearchInput } from "./components/SearchInput";
import { SearchResult } from "./components/SearchResult";

interface Props {
  searchParams: { search: string | null; lang: string };
}

const HomePage = async ({ searchParams: { search, lang } }: Props) => {
  return (
    <div className="h-full">
      <SearchInput />
      <SearchResult search={search} lang={lang} />
    </div>
  );
};

export default HomePage;
