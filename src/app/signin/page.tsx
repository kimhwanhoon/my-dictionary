import { AuthPage } from "@/components/auth/AuthPage";
import { Circles } from "@/components/auth/background/Circles";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const { isSession } = await checkUserSession();

  if (isSession) {
    redirect("/home");
  }
  return (
    <section className="h-full  flex flex-col items-center justify-center ">
      <div className="background">
        <Circles />
      </div>
      <AuthPage type="sign-in" />
    </section>
  );
};

export default SignInPage;
