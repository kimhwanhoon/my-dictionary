import "server-only";

import { NextRequest } from "next/server.js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { RouteReturnType } from "@/types/routeReturnTypes";
import { isUserEmailDuplicated } from "@/utils/supabase/auth/isUserEmailDuplicated";

const signUp = async (req: NextRequest): Promise<RouteReturnType> => {
  const {
    email,
    duplicateChecked,
  }: { email: string; duplicateChecked: boolean } = await req.json();

  //
  // Email duplicate check
  //
  if (!duplicateChecked) {
    const { duplicated, error: duplicateEmailCheckingError } =
      await isUserEmailDuplicated(email);

    if (duplicateEmailCheckingError) {
      return NextResponse.json({
        error: true,
        message: "Error occurred.",
      });
    }

    if (duplicated) {
      return NextResponse.json({
        error: true,
        message: "Email already registered.",
      });
    } else {
      return NextResponse.json({
        error: false,
        message: "Email not duplicated.",
      });
    }
    //
    // Create user by "signin through OTP"
    //
  } else {
    const supabase = createClient(cookies());
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) {
      console.log(error);
      return NextResponse.json({ error: true, message: error.message });
    } else {
      return NextResponse.json({
        error: null,
        message: "ok",
      });
    }
  }
};

export { signUp as POST };
