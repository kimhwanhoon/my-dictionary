interface ListItem {
  listId: number;
  word: string;
}

export function countWordsByListId(list: ListItem[]): Record<number, number> {
  const wordCountMap: Record<number, number> = {};

  list.forEach((item) => {
    const { listId } = item;
    if (!wordCountMap[listId]) {
      wordCountMap[listId] = 1;
    } else {
      wordCountMap[listId]++;
    }
  });

  return wordCountMap;
}
