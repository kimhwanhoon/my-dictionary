import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AuthBody } from "@/types/auth/AuthBody";

const signUp = async (req: NextRequest) => {
  const { email, password }: AuthBody = await req.json();

  // if email or password is empty, return error
  if (email.length === 0) {
    return NextResponse.json({ error: { message: "email is empty." } });
  } else if (password.length === 0) {
    return NextResponse.json({ error: { message: "password is empty." } });
  }

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      return NextResponse.json({ error: signupError });
    } else {
      return NextResponse.json({
        error: null,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};

export { signUp as POST };
