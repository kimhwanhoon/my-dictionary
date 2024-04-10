import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SignInHandlerProps {
  emailValue: string;
  passwordValue: string;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  router: AppRouterInstance;
}

export const signupHandler = async ({
  emailValue,
  passwordValue,
  router,
  setErrorMessage,
  setIsLoading,
}: SignInHandlerProps) => {
  setIsLoading(true);
  try {
    const body = JSON.stringify({
      email: emailValue,
      password: passwordValue,
    });
    const { error } = await fetch("/auth/signup", {
      method: "POST",
      body,
    }).then((res) => res.json());
    if (error) {
      throw new Error(error.message);
    } else {
      // if no error, redirect to success page
      router.push("/signup?success=true");
    }
  } catch (error: any) {
    // error handling
    console.log(error);
    if (error.message === "email is empty.") {
      setErrorMessage("Email is empty.");
    } else if (error.message === "password is empty.") {
      setErrorMessage("Password is empty.");
    } else if (error.message === "Invalid login credentials") {
      setErrorMessage("Invalid email or password.");
    } else if (
      error.message.includes(
        "Password should contain at least one character of each"
      )
    ) {
      setErrorMessage(
        "Password requires: lowercase, uppercase, numbers, special characters."
      );
    } else {
      setErrorMessage(error.message);
    }
  } finally {
    setIsLoading(false);
  }
};
