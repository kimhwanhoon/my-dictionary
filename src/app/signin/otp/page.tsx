import { OTP } from "@/components/auth/OTP";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { sent: string };
}

const OTPPage = async ({ searchParams }: Props) => {
  const { isSession } = await checkUserSession();
  isSession ? redirect("/home") : redirect("/signin");

  const hasOtpSent = searchParams.sent === "true" ? true : false;
  const cookieStore = cookies();
  const userEmail = cookieStore.get("email")
    ? cookieStore.get("email")?.value
    : null;

  if (!hasOtpSent) {
    redirect("/signin");
  }
  if (!userEmail) {
    redirect("/signin?error=true");
  }
  return (
    <div className="flex justify-center items-center h-full">
      <OTP email={userEmail} />
    </div>
  );
};

export default OTPPage;
