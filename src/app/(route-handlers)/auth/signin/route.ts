import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AuthBody } from "@/types/auth/AuthBody";

const signIn = async (req: NextRequest) => {
  const { email, password }: AuthBody = await req.json();

  // if email was empty, return error
  if (!email) {
    return NextResponse.json({ error: { message: "email is empty." } });
  } else if (!password) {
    return NextResponse.json({ error: { message: "password is empty." } });
  }

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: { message: error.message } });
    } else {
      return NextResponse.json({
        error: null,
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export { signIn as POST };
