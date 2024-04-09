interface SignInHandlerProps {
  emailValue: string;
  passwordValue: string;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  router: any;
}

export const signinHandler = async ({
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
    const { error } = await fetch("/auth/signin", {
      method: "POST",
      body,
    }).then((res) => res.json());
    if (error) {
      throw new Error(error.message);
    } else {
      // if no error, redirect to home
      router.push("/");
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
    } else if (error.message === "Email not confirmed") {
      setErrorMessage("Your email is not confirmed yet.");
    }
  } finally {
    setIsLoading(false);
  }
};
