import { AuthPage } from "@/components/auth/AuthPage";
import { OTP } from "@/components/auth/OTP";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { "otp-sent": boolean; email: string; error: string };
}

const SignInPage = ({ searchParams }: Props) => {
  const isError = searchParams.error === "true" ? true : false;
  const optSent = searchParams["otp-sent"];
  const cookieStore = cookies();
  const userEmail = cookieStore.get("email")?.value;

  if (!userEmail && typeof userEmail !== "string") {
    redirect("/signin?error=true");
  } else {
    return (
      <section className="h-full bg-main flex flex-col items-center justify-center">
        {optSent ? (
          <OTP email={userEmail} />
        ) : (
          <AuthPage type="sign-in" isError={isError} />
        )}
      </section>
    );
  }
};

export default SignInPage;
