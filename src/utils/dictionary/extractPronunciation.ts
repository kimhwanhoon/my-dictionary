import { deleteText } from "./deleteText";

export const extractPronunciation = (originalText: string): string | null => {
  if (!originalText) {
    return null;
  }

  const regex = /<span class="pron" type="">(.*?)<a href="#"/;
  const match = originalText.match(regex);

  if (!match || match.length < 2) {
    return null;
  }

  const unnecessaryTags = [`<sup class="hi">`, `</sup>`, `ˈ`];

  const cleanedText = unnecessaryTags.reduce((text, tag) => {
    return deleteText({ originalText: text, target: tag });
  }, match[1]);

  return cleanedText;
};
