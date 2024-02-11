"use client";

import { RouteReturnContents } from "@/types/routeReturnTypes";
import { ToastContainer } from "@/utils/react-toastify/ToastContainer";
import { Button, Divider, Input, Link, Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  type: "sign-in" | "sign-up";
  isError?: boolean;
  email?: string;
}

export const AuthPage = ({ type, isError, email = "" }: Props) => {
  const [emailValue, setEmailValue] = useState<string>(email);
  // UX: Loading, routing
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const signInErrorToast = (timeOutId: number) => {
    toast.error(
      <div className="flex flex-col items-center">
        <h6 className="w-full font-medium">Email doesn&apos;t exist</h6>
        <p className="w-full text-sm">We will redirect you to sign up page.</p>
        <Button
          fullWidth
          size="sm"
          className="text-sm font-medium my-2"
          color="danger"
          onClick={() => {
            clearTimeout(timeOutId);
            toast.dismiss();
          }}
        >
          Click to abort
        </Button>
      </div>
    );
    toast.play();
  };

  const signUpToast = () => {
    setEmailValue("");
    setTimeout(() => {
      toast.success(
        <div className="flex flex-col items-center">
          <h6 className="w-full font-medium">Email Sent</h6>
          <p className="w-full text-sm">
            We just sent you the confirmation email. Please check.
          </p>
          <Button
            fullWidth
            size="sm"
            className="text-sm font-medium my-2 text-white"
            color="success"
            onClick={() => toast.dismiss()}
          >
            Close
          </Button>
        </div>
      );
    }, 0);
  };

  //
  const performAuthAction = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const buttonInnerText = e.currentTarget.innerText;
    const formData = new FormData();
    formData.append("email", emailValue);
    setProgress(25);

    if (buttonInnerText === "Sign In") {
      try {
        setProgress(50);
        const response = await fetch("/auth/signin", {
          method: "post",
          body: formData,
        });
        const { error, message }: RouteReturnContents = await response.json();
        setProgress(100);
        if (error) {
          setIsLoading(false);
          setProgress(100);
          if (message.includes("Signups not allowed for otp")) {
            // when trying to sign in without having email registered.
            const timeOutId = setTimeout(() => {
              router.push(`/signup?email=${emailValue}`);
            }, 5500);
            signInErrorToast(timeOutId as any);
          } else {
            router.replace(`/signin?error=true`);
          }
        } else {
          router.replace(`/signin/otp?sent=true`);
        }
      } catch (error) {
        router.replace(`/signin?error=true`);
      }
    } else {
      try {
        setProgress(50);
        setTimeout(() => {
          setProgress(75);
        }, 1000);
        const response = await fetch("/auth/signup", {
          method: "post",
          body: formData,
        });
        const { error, message } = await response.json();
        setProgress(100);
        setIsLoading(false);
        if (error) {
          router.replace("/signup?error=true");
        } else {
          signUpToast();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="px-8 w-full mx-auto max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-main-5 py-4">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-15">
            {type === "sign-in"
              ? "Enter your information to sign in"
              : "Enter your information to sign up"}
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              className="py-2"
              name="email"
              size={"md"}
              type="email"
              label="Email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              // placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex items-center space-x-2 flex-col gap-2">
            {isError === true && (
              <span className="text-red-600 opacity-80 text-xs text-center">
                An error has occurred. Please try again.
              </span>
            )}
            <Button
              color="primary"
              fullWidth
              type="submit"
              // formAction={type === "sign-in" ? login : signup}
              onClick={(e) => performAuthAction(e)}
              isLoading={isLoading}
            >
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
          {isLoading ? (
            <Progress
              color="primary"
              size="sm"
              aria-label="Loading progress bar"
              value={progress}
            />
          ) : (
            <Divider className="my-8" />
          )}
          <div className="text-center flex flex-col items-center gap-1">
            <span className="text-sm">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <Link
              className="flex justify-end underline-offset-2 mr-2 text-sm"
              size="sm"
              color="primary"
              underline="always"
              href={type === "sign-in" ? "/signup" : "/signin"}
            >
              {type === "sign-in" ? "Create an Account" : "Go to Sign in page"}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
