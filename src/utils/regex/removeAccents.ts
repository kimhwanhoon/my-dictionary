export const removeAccents = (word: string) =>
  word
    .normalize("NFD")
    .toLowerCase()
    .replaceAll(/[\u0300-\u035f]/g, "");
