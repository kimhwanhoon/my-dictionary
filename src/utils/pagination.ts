import { Database } from "@/types/supabaseTypes";

type RenderDataType = Pick<
  Database["public"]["Tables"]["french_dictionary"]["Row"],
  "word" | "definition" | "example"
>;

export const splitArray = (arr: RenderDataType[], chunkSize: number = 10) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};
