import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RouteReturnType } from "@/types/routeReturnTypes";

const signUp = async (req: NextRequest): Promise<RouteReturnType> => {
  const formData = await req.formData();
  const email = formData.get("email") as string;

  // if email was empty, return error
  if (!formData || !email) {
    return NextResponse.json({ error: true, message: "email is empty." });
  }

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email as string,
      options: {
        shouldCreateUser: true,
      },
    });
    //
    // console.log(data);
    //
    if (error) {
      return NextResponse.json({ error: true, message: error.message });
    } else {
      return NextResponse.json({
        error: null,
        message: "ok",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: true, message: "" });
  }
};

export { signUp as POST };
