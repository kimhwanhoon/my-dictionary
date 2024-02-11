import { AuthPage } from "@/components/auth/AuthPage";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { error: string };
}

const SignInPage = async ({ searchParams }: Props) => {
  const isError = searchParams.error === "true" ? true : false;
  const { isSession, userData } = await checkUserSession();

  if (isSession) {
    redirect("/welcome");
  }
  return (
    <section className="pattern-bg-knitting h-full bg-main flex flex-col items-center justify-center ">
      <AuthPage type="sign-in" isError={isError} />
    </section>
  );
};

export default SignInPage;
