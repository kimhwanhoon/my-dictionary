import { AuthPage } from "@/components/auth/AuthPage";
import { Circles } from "@/components/auth/background/Circles";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const { isSession } = await checkUserSession();
  if (isSession) {
    redirect("/home");
  }

  return (
    <section className="h-full bg-transparent flex flex-col items-center justify-center">
      <div className="background -z-10">
        <Circles />
      </div>
      <AuthPage type="sign-up" />
    </section>
  );
};

export default SignUpPage;
