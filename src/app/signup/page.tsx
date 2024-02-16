import { AuthPage } from "@/components/auth/AuthPage";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { email?: string };
}

const SignUpPage = async ({ searchParams: { email } }: Props) => {
  const { isSession, userData } = await checkUserSession();
  if (isSession) {
    redirect("/home");
  }
  return (
    <section className="pattern-bg-knitting h-full bg-main flex flex-col items-center justify-center">
      <AuthPage type="sign-up" email={email} />
    </section>
  );
};

export default SignUpPage;
