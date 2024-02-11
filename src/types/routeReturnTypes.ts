import { NextResponse } from "next/server";

interface ReturnType {
  error: boolean | null;
  message: "ok" | string;
}

export type RouteReturnContents = ReturnType;
export type RouteReturnType = NextResponse<ReturnType>;
