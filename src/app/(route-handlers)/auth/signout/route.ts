import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect("/");
};

export { signOut as GET };
