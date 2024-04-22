import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const runtime = "edge";

const SignOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();

  redirect("/");
};

export default SignOut;
