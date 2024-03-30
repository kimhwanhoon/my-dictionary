import { OTP } from "@/components/auth/OTP";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { sent: string };
}

const OTPPage = async ({ searchParams }: Props) => {
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
    <div className="dark:bg-gray-900 dark:bg-opacity-0 flex justify-center items-center h-full">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <OTP email={userEmail} />
    </div>
  );
};

export default OTPPage;
