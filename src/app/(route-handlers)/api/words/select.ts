import "server-only";

import { Database } from "@/types/supabaseTypes";
import { SupabaseClient } from "@supabase/supabase-js";

// Presumed that already have a valid user auth.
// Already have supabase and user id.

interface Props {
  supabase: SupabaseClient<Database>;
  uid: string;
  duplicateCheck?: {};
}

export const select = async ({ supabase, uid }: Props) => {
  const { error, data } = await supabase
    .from("my_words")
    .select("words")
    .eq("author_id", uid)
    .single();

  if (error) {
    return {
      error: true,
      errorMessage: "Word does not exist",
      data: null,
    };
  } else {
    return { error: false, errorMessage: null, data };
  }
};
