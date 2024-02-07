import { AuthPage } from "@/components/auth/AuthPage";

const SignUpPage = () => {
  return (
    <section className="h-full bg-main flex flex-col items-center justify-center">
      <AuthPage type="sign-up" />
    </section>
  );
};

export default SignUpPage;
