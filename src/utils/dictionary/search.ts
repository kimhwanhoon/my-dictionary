import "server-only";

interface SearchProps {
  word: string | null;
}

export const searchDictionary = async ({ word }: SearchProps) => {
  if (!word) return;
  const ROOT_API = "https://fr.wiktionary.org/w/api.php";

  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: word,
    format: "json",
    titles: word,
    prop: "extracts",
    srlimit: "1",
  });

  const res = await fetch(`${ROOT_API}?${params}`);
  const data = await res.json();

  return data;
};
