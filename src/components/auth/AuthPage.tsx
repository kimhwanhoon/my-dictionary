import { login, signup } from "@/utils/supabase/login";
import { Button, Divider, Input, Link } from "@nextui-org/react";

interface Props {
  type: "sign-in" | "sign-up";
}

export const AuthPage = ({ type }: Props) => {
  return (
    <div className=" mx-auto max-w-[400px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-main-5">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {type === "sign-in"
            ? "Enter your information to sign in"
            : "Enter your information to sign up"}
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Input
            name="email"
            size={"md"}
            type="email"
            label="Email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            color="primary"
            fullWidth
            type="submit"
            formAction={type === "sign-in" ? login : signup}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
        <Divider className="my-8" />
        {type === "sign-in" ? (
          <div className="text-center flex flex-col items-center">
            <span className="text-15">Don&apos;t have an account?</span>
            <Link
              className="flex justify-end underline-offset-2 mr-2 text-sm"
              size="sm"
              color="primary"
              underline="always"
              href="/signup"
            >
              Create an Account
            </Link>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center">
            <span className="text-15">Already have an account?</span>
            <Link
              className="flex justify-end underline-offset-2 mr-2 text-sm"
              size="sm"
              color="primary"
              underline="always"
              href="/signin"
            >
              Go to Sign in page
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};
