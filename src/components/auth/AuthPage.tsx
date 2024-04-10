/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { emailRegex } from "@/utils/regex/email";
import { Button, Divider, Link } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PasswordInput } from "./Inputs/PasswordInput";
import { EmailInput } from "./Inputs/EmailInput";
import { signinHandler } from "@/utils/supabase/auth/signinHandler";
import { signupHandler } from "@/utils/supabase/auth/signupHandler";

export const AuthPage = () => {
  // path & router
  const pathname = usePathname();
  const router = useRouter();
  // ---------------------
  // type (signin or signup)
  const [type, setType] = useState<"signin" | "signup">(
    pathname.includes("signin") ? "signin" : "signup"
  );
  // set type based on pathname
  useEffect(() => {
    setType(pathname.includes("signin") ? "signin" : "signup");
  }, [pathname]);
  // ---------------------
  // email and password
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  // ---------------------
  // Auth functions (etc.)
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const togglePasswordVisibility = () => setIsHidden(!isHidden);
  // ---------------------
  // Loading & progress & error
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // ---------------------
  // Form submit handler
  // signinHandler & signupHandler
  // ---------------------
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const handler = pathname.includes("signin") ? signinHandler : signupHandler;
    handler({
      emailValue,
      passwordValue,
      router,
      setErrorMessage,
      setIsLoading,
    });
  };
  // ---------------------
  return (
    <div className="px-10 py-16 rounded-xl shadow-large w-full mx-auto max-w-[400px] space-y-3 bg-slate-100 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80">
      <div className="space-y-2 text-center">
        <h2
          key={type + 0}
          className="text-3xl font-bold text-indigo-600 dark:text-gray-200 py-4"
        >
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-15">
          {type === "signin"
            ? "Enter your information to sign in"
            : "Enter your information to sign up"}
        </p>
      </div>
      <form className="space-y-4" onSubmit={formSubmitHandler}>
        <div className="space-y-2">
          <EmailInput emailValue={emailValue} setEmailValue={setEmailValue} />
          <PasswordInput
            passwordValue={passwordValue}
            setPasswordValue={setPasswordValue}
            isHidden={isHidden}
            togglePasswordVisibility={togglePasswordVisibility}
            type={type}
          />
        </div>
        <div className="flex items-center space-x-2 flex-col gap-2">
          <Button
            color="primary"
            fullWidth
            type="submit"
            isLoading={isLoading}
            disabled={
              emailRegex.test(emailValue) && passwordValue.length > 8
                ? false
                : true
            }
            className="disabled:bg-opacity-50 disabled:cursor-not-allowed"
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
        </div>
        {isLoading ? <></> : <Divider className="my-8" />}
        <div className="text-center flex flex-col items-center gap-1">
          <span className="text-sm">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Link
            className="flex justify-end underline-offset-2 mr-2 text-sm dark:text-slate-400"
            size="sm"
            color="primary"
            underline="always"
            href={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Create an Account" : "Go to Sign in page"}
          </Link>
        </div>
      </form>
    </div>
  );
};
