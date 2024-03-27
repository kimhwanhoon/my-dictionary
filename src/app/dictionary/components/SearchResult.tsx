import { capitalizeFirstLetter } from "@/utils/dictionary/capitalizeFirstLetter";
import { extractPronunciation } from "@/utils/dictionary/extractPronunciation";
import { extractTextBetweenTags } from "@/utils/dictionary/extractTextBetweenTags";
import { removeTitle } from "@/utils/dictionary/removeTitle";
import { searchDictionary } from "@/utils/dictionary/search";
import parse from "html-react-parser";
import { Buttons } from "./Buttons";

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
    const resultBefore = data.entryContent;
    const resultWord = extractTextBetweenTags(resultBefore);
    const pronunciation = extractPronunciation(resultBefore);

    const newTitle = `<div class="flex gap-2 items-center"><h1 class="text-4xl font-semibold pr-2">${capitalizeFirstLetter(
      resultWord as string
    )}</h1><span class="text-xs text-gray-700">[${pronunciation}]</span></div>`;

    const titleRemoved = removeTitle(resultBefore);
    return (
      <section className="flex flex-col p-4 dictionary-result-background pt-8">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 items-center">
            <h1 className="text-4xl font-semibold pr-2">
              {capitalizeFirstLetter(resultWord as string)}
            </h1>
            <span className="text-xs text-gray-700">[{pronunciation}]</span>
          </div>
          <Buttons word={resultWord as string} />
        </div>
        {parse(titleRemoved)}
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
