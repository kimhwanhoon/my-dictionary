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

  const removeUnnecessaryTag = deleteText({
    originalText: match[1],
    target: `<sup class="hi">`,
  });
  const removeUnnecessaryTag2 = deleteText({
    originalText: removeUnnecessaryTag,
    target: `</sup>`,
  });
  const removeUnnecessaryTag3 = deleteText({
    originalText: removeUnnecessaryTag2,
    target: `ˈ`,
  });

  return removeUnnecessaryTag3;
};
