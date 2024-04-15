import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const addThemeOnCookie = async (req: NextRequest) => {
  const { theme } = await req.json();
  const cookieStore = cookies();

  cookieStore.set("theme", theme);

  return NextResponse.json({ success: true });
};

export { addThemeOnCookie as POST };
