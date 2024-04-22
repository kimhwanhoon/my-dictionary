import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const googleSignInHandler = async () => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ error: null, data });
  }
};

export { googleSignInHandler as GET };
