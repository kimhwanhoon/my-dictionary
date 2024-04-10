import { AuthPage } from "@/components/auth/AuthPage";
import { Circles } from "@/components/auth/background/Circles";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";
import { ConfirmationSent } from "./components/ConfirmationSent";

interface SignUpPageProps {
  searchParams: { success: string };
}

const SignUpPage = async ({ searchParams: { success } }: SignUpPageProps) => {
  const isConfirmMailSent = Boolean(success);

  const { isSession } = await checkUserSession();
  if (isSession) {
    redirect("/home");
  }

  return (
    <section className="h-full bg-transparent flex flex-col items-center justify-center">
      <div className="background -z-10">
        <Circles />
      </div>
      {isConfirmMailSent ? <ConfirmationSent /> : <AuthPage />}
    </section>
  );
};

export default SignUpPage;
