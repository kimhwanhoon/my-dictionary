type MyWordsJsonType = {
  word: string;
  definition: string[];
  example: string[];
};

// my_words > words

interface InnerDataType {
  id: number;
  definition: string;
  example: string;
}

export interface WordType {
  id: number;
  word: string;
  data: InnerDataType[];
}
