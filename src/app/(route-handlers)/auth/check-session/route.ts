import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { NextResponse } from "next/server";

const checkSession = async () => {
  const { isSession, userData } = await checkUserSession();
  return NextResponse.json({ isSession, userData });
};

export { checkSession as GET };
