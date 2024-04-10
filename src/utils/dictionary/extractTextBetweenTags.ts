export const extractTextBetweenTags = (text: string): string | null => {
  if (!text) {
    return null;
  }
  const regex = /<h1 class="hwd">(.*?)<\/h1>/;
  const match = text.match(regex);

  if (!match || match.length < 2) {
    return null;
  }

  const extractedText = match[1];

  const spanFiltered = extractedText.replace(/<span[^>]*>.*?<\/span>/gi, "");

  const resultLowerCased = spanFiltered.toLowerCase();

  return resultLowerCased;
};
