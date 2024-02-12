import { RouteReturnType } from "@/types/routeReturnTypes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const loadingAnimationPlayed = async (): Promise<RouteReturnType> => {
  const cookieStore = cookies();
  const oneHour = 1000 * 60;
  cookieStore.set("loadingAnimationPlayed", "true", {
    expires: Date.now() + oneHour,
    secure: true,
  });
  return NextResponse.json({ error: null, message: "ok" });
};

export { loadingAnimationPlayed as POST };
