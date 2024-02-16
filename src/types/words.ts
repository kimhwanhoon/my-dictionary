export interface wordType {
  word: string;
  definition?: string;
  example?: string;
  created_by?: string;
}

export type Words = wordType[];
