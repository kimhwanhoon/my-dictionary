import { AuthPage } from "@/components/auth/AuthPage";
import { OTP } from "@/components/auth/OTP";

interface Props {
  searchParams: { "otp-sent": boolean; email: string };
}

const SignInPage = ({ searchParams }: Props) => {
  const optSent = searchParams["otp-sent"];
  const email = searchParams.email;

  return (
    <section className="h-full bg-main flex flex-col items-center justify-center">
      {optSent ? <OTP email={email} /> : <AuthPage type="sign-in" />}
    </section>
  );
};

export default SignInPage;
