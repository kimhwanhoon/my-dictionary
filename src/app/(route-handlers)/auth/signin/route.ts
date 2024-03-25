import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RouteReturnType } from "@/types/routeReturnTypes";

const signIn = async (req: NextRequest): Promise<RouteReturnType> => {
  const { email }: { email: string } = await req.json();

  // if email was empty, return error
  if (!email) {
    return NextResponse.json({ error: true, message: "email is empty." });
  }

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    console.log(data);
    console.log(error);
    if (error) {
      console.log(1);
      if (error.message.includes("Signups not allowed for otp")) {
        console.log(2);
        console.log(error.message);
        return NextResponse.json({ error: true, message: error.message });
      }
      console.log(error);
      return NextResponse.json({ error: true, message: error.message });
    } else {
      cookies().set("email", email, { secure: true });
      return NextResponse.json({
        error: null,
        message: "ok",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: true, message: "" });
  }
};

export { signIn as POST };
