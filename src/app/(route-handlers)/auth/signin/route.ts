import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RouteReturnType } from "@/types/routeReturnTypes";

const signIn = async (req: NextRequest): Promise<RouteReturnType> => {
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
        shouldCreateUser: false,
      },
    });
    //
    console.log(data);
    //
    if (error) {
      console.log("error2", error);
      return NextResponse.json({ error: true, message: error.message });
    } else {
      cookies().set("email", email, { secure: true });
      return NextResponse.json({
        error: null,
        message: "ok",
      });
    }
  } catch (error) {
    console.log("error3", error);
    return NextResponse.json({ error: true, message: "" });
  }

  // revalidatePath("/", "layout");
  // redirect("/");
};

export { signIn as POST };
