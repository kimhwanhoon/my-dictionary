import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const otpRoute = async (request: Request) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const token = String(formData.get("token"));

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (session) {
    console.log(session);
    return NextResponse.json({ error: false, message: null }, { status: 200 });
  }
  if (error) {
    console.log(error);
    return NextResponse.json({ error: true, message: error.message });
  }
};

export { otpRoute as POST };
