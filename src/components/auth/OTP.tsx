/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { block } from "@/utils/block";
import {
  Button,
  Link,
  Modal,
  ModalContent,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

interface Props {
  email: string | null;
}

export const OTP = ({ email }: Props) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [codeMatched, setCodeMatched] = useState<boolean>(false);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [hasResent, setHasResent] = useState<boolean>(false);
  const [disableCount, setDisableCount] = useState<number>(60);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // alert
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  //
  const router = useRouter();

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    setProgress(20);
    const body = JSON.stringify({ email, token: otp });
    const res = await fetch("/auth/otp", { method: "post", body });
    setProgress(50);
    const { error, message } = await res.json();
    setProgress(95);
    await block(500);
    setIsLoading(false);
    setProgress(100);

    if (error) {
      setErrorMessage(message);
      openModal();
      setOtp("");
    }

    if (!error) {
      setCodeMatched(true);
      router.refresh();
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP();
    }
  }, [otp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisableCount((prev) => {
        if (prev === 0) {
          setIsResendDisabled(false);
          clearInterval(interval);
          return prev;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasResent]);

  const resendOTP = async () => {
    const body = JSON.stringify({ email });
    const res = await fetch("/auth/signin", { method: "post", body });
    const { error, message } = await res.json();
    console.log(error);
    console.log(message);
    if (!error) {
      console.log("resent success.");
      setHasResent(true);
      setDisableCount(60);
      setIsResendDisabled(true);
    } else {
      console.log(error, message);
    }
  };

  return (
    <>
      {/* Modal starts */}
      <Modal
        className="z-50 bg-opacity-60 dark:bg-opacity-60 p-1 dark:bg-gray-800"
        placement="top"
        isOpen={isOpen}
        onClose={() => closeModal()}
        backdrop="transparent"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className=" p-5 pb-3 flex flex-col gap-2 justify-center items-center">
                <div className="text-15 text-gray-800 dark:text-gray-200 text-center">
                  <p>{errorMessage}.</p>
                  <p>Please try again.</p>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Modal ends */}
      <div className="flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-slate-100 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm text-gray-600 dark:text-gray-200">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>
            <div>
              <form method="post">
                <div className="flex justify-center">
                  {!codeMatched && (
                    <OTPInput
                      shouldAutoFocus
                      inputType="number"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="bg-gray-100 dark:bg-slate-800 py-3 mx-1 rounded-md shadow-small dark:text-white"
                          style={{ textAlign: "center", width: "100%" }}
                        />
                      )}
                      onPaste={handlePaste}
                    />
                  )}
                </div>
                {/* resend code count */}
                <div className="flex justify-center items-center pt-4">
                  <p
                    className={`text-sm underline ${
                      isResendDisabled
                        ? "cursor-wait opacity-50"
                        : "cursor-pointer"
                    }`}
                    onClick={resendOTP}
                  >
                    Resend code
                  </p>
                  {isResendDisabled && (
                    <span className="pl-2 text-sm opacity-50">
                      {disableCount}
                    </span>
                  )}
                </div>
                {/*  */}
                <div className="pt-8">
                  {!codeMatched && (
                    <Button
                      className="disabled:bg-opacity-90 disabled:cursor-not-allowed"
                      disabled={otp.length !== 6}
                      color="primary"
                      fullWidth
                      onClick={verifyOTP}
                      isLoading={isLoading}
                    >
                      Confirm
                    </Button>
                  )}
                </div>
                {isLoading && (
                  <div className="pt-4">
                    <Progress
                      color="primary"
                      size="sm"
                      aria-label="Loading..."
                      value={progress}
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
