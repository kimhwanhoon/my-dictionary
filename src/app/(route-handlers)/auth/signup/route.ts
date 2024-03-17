import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RouteReturnType } from "@/types/routeReturnTypes";

const signUp = async (req: NextRequest): Promise<RouteReturnType> => {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const verifyEmailClicked: boolean = formData.get("verifyingEmail")
    ? true
    : false;
  console.log("verifyEmailClicked", verifyEmailClicked);

  // if email was empty, return error
  if (!formData || !email) {
    return NextResponse.json({ error: true, message: "email is empty." });
  }

  const cookieStore = cookies();

  if (verifyEmailClicked) {
    try {
      const supabase = createClient(cookieStore, { auth: true });

      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();

      if (error) {
        return NextResponse.json({
          error: true,
          message: "Error caught fetching user list.",
        });
      }

      const isEmailDuplicated = users.some(
        (userinfo) => email === userinfo.email
      );

      if (isEmailDuplicated) {
        return NextResponse.json({ error: true, message: "Email duplicated." });
      } else {
        return NextResponse.json({ error: false, message: "ok" });
      }
    } catch (error) {
      return NextResponse.json({ error: true, message: "Error caught" });
    }
  } else {
    try {
      const supabase = createClient(cookieStore);
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email as string,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        return NextResponse.json({ error: true, message: error.message });
      } else {
        return NextResponse.json({
          error: null,
          message: "ok",
        });
      }
    } catch (error) {
      return NextResponse.json({ error: true, message: "Error caught" });
    }
  }
};

export { signUp as POST };
