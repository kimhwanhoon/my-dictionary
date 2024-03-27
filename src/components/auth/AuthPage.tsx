/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { block } from "@/utils/block";
import { emailRegex } from "@/utils/regex/email";
import {
  Button,
  Divider,
  Input,
  Link,
  Modal,
  ModalContent,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { IconMail } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Logo } from "../Logo";

interface Props {
  type: "sign-in" | "sign-up";
  isError?: boolean;
  email?: string;
}

export const AuthPage = ({ type, isError, email = "" }: Props) => {
  const isErrorOccurred =
    useSearchParams().get("error") === "true" ? true : false;
  const [emailValue, setEmailValue] = useState<string>(email);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  // UX: Loading, routing
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progressTitle, setProgressTitle] = useState<ReactNode>(<></>);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [progressBarColor, setProgressBarColor] = useState<
    "danger" | "default" | "primary" | "secondary" | "success" | "warning"
  >("primary");
  const changeProgress = ({
    title,
    value,
  }: {
    title: ReactNode;
    value: number;
  }) => {
    setProgressTitle(title);
    setProgressValue(value);
  };
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const [duplicateChecked, setDuplicateChecked] = useState<boolean>(false);
  const router = useRouter();

  const onSignUpHandler = async (type: "sign-in" | "sign-up") => {
    // On Error
    const onError = async (message: string | ReactNode) => {
      setProgressBarColor("danger");
      changeProgress({
        title: <div className="text-gray-700">{message}</div>,
        value: 100,
      });
      await block(5000);
      setIsLoading(false);
      setProgressBarColor("primary");
    };
    // Email duplicate check (sign-up)
    //
    if (type === "sign-up") {
      console.log(0);
      console.log(duplicateChecked);
      if (!duplicateChecked) {
        setIsLoading(true);
        changeProgress({ title: "Checking your email", value: 0 });
        await block(500);
        setProgressValue(10);
        await block(500);
        setProgressValue(20);
        const body = { email: emailValue, duplicateChecked };
        const response = await fetch("/auth/signup", {
          method: "post",
          body: JSON.stringify(body),
        });
        await block(300);
        setProgressValue(25);
        const { error, message } = await response.json();
        if (error) {
          setDuplicateChecked(false);
          await onError("Email is already registered.");
          router.replace("/signup?error=true");
        } else {
          changeProgress({
            title: "Your email is available.",
            value: 50,
          });
          await block(1000);
          setDuplicateChecked(true);
        }
        // Create user by "signin through OTP"
        // , signing you up...
      } else {
        changeProgress({
          title: "Signing you up...",
          value: 65,
        });
        await block(500);
        setProgressValue(75);
        const body = { email: emailValue, duplicateChecked };
        const response = await fetch("/auth/signup", {
          method: "post",
          body: JSON.stringify(body),
        });
        setProgressValue(85);
        const { error, message } = await response.json();
        if (error) {
          console.log(321312);
          console.log(error);
          setDuplicateChecked(false);
          await onError("Error occurred. Please try again.");
          router.replace("/signup?error=true");
        } else {
          changeProgress({
            title: (
              <>
                <span className="text-base font-medium">You&apos;re up!</span>
                <br />
                Check your email for the verification.
              </>
            ),
            value: 100,
          });
          await block(5000);
          setIsLoading(false);
        }
      }
    } else {
      // sign in
      setIsLoading(true);
      changeProgress({ title: "Checking your email", value: 15 });
      await block(500);
      setProgressValue(25);
      await block(500);
      changeProgress({ title: "Finding your email...", value: 50 });
      setTimeout(() => {
        changeProgress({ title: "Finding your email...", value: 60 });
      }, 1000);
      try {
        const body = { email: emailValue };
        const response = await fetch("/auth/signin", {
          method: "post",
          body: JSON.stringify(body),
        });
        changeProgress({ title: "Finding your email...", value: 70 });
        await block(500);
        const { error, message } = await response.json();
        if (error) {
          if (message.includes("Signups not allowed for otp")) {
            await onError(
              <>
                <p>This email is not associated with this app.</p>
                <p>You&apos;re redirecting you to sign up page.</p>
              </>
            );
            router.push("/signup");
          } else {
            await onError("Error occurred. Please try again.");
          }
        } else {
          changeProgress({
            title: (
              <>
                <span className="text-base font-medium">We sent you mail.</span>
                <br />
                Check your email for sign in.
              </>
            ),
            value: 100,
          });
          await block(2000);
          router.replace("/signin/otp?sent=true");
          setIsLoading(false);
        }
      } catch (error) {
        await onError("Error occurred. Please try again.");
      } finally {
        setProgressValue(100);
      }
    }
  };

  useEffect(() => {
    if (duplicateChecked) {
      onSignUpHandler("sign-up");
    }
  }, [duplicateChecked]);

  useEffect(() => {
    if (isLoading) {
      openModal();
    } else {
      closeModal();
    }
  }, [isLoading]);

  return (
    <>
      {/* Modal starts */}
      <Modal
        placement="top"
        backdrop="opaque"
        isOpen={isOpen}
        onClose={() => setIsLoading(false)}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="p-5 pb-3 flex flex-col gap-2">
                <div className="text-sm text-gray-800">{progressTitle}</div>
                <Progress
                  color={progressBarColor}
                  size="sm"
                  value={progressValue}
                />
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Modal ends */}
      <div className="px-10 py-16 rounded-xl shadow-large w-full mx-auto max-w-[400px] space-y-3 bg-slate-100 bg-opacity-70 dark:bg-slate-900 dark:bg-opacity-70">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-gray-200 py-4">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-15">
            {type === "sign-in"
              ? "Enter your information to sign in"
              : "Enter your information to sign up"}
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              isDisabled={isLoading}
              ref={emailInputRef}
              className="py-2"
              name="email"
              size={"md"}
              type="email"
              label={
                <div className="flex items-center gap-1 text-gray-500">
                  <IconMail size={"1rem"} />
                  <span>Email</span>
                </div>
              }
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              autoComplete="email"
              required
              description={
                isError && (
                  <span className="text-red-400">
                    Error occurred. Please try again.
                  </span>
                )
              }
            />
            {isErrorOccurred && (
              <p className="text-sm w-full text-right text-gray-700 font-medium cursor-pointer hover:underline underline-offset-1">
                Having a problem?
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 flex-col gap-2">
            {isError === true && (
              <span className="text-red-600 opacity-80 text-xs text-center">
                An error has occurred. Please try again.
              </span>
            )}
            <Button
              ref={submitButtonRef}
              color="primary"
              fullWidth
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (submitButtonRef.current?.innerText === "Sign Up") {
                  onSignUpHandler("sign-up");
                } else if (submitButtonRef.current?.innerText === "Sign In") {
                  onSignUpHandler("sign-in");
                }
              }}
              isLoading={isLoading}
              disabled={emailRegex.test(emailValue) ? false : true}
              className="disabled:bg-opacity-50"
            >
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
          {isLoading ? <></> : <Divider className="my-8" />}
          <div className="text-center flex flex-col items-center gap-1">
            <span className="text-sm">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <Link
              className="flex justify-end underline-offset-2 mr-2 text-sm dark:text-slate-400"
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
