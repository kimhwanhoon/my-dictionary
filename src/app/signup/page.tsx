import { AuthPage } from "@/components/auth/AuthPage";

interface Props {
  searchParams: { email?: string };
}

const SignUpPage = ({ searchParams: { email } }: Props) => {
  return (
    <section className="h-full bg-main flex flex-col items-center justify-center">
      <AuthPage type="sign-up" email={email} />
    </section>
  );
};

export default SignUpPage;
