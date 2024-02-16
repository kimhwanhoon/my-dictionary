export interface wordType {
  word: string;
  definition: string[] | null;
  example: string[] | null;
  created_by: string;
}

export type Words = wordType[];
