/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Input, Progress, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Alert } from "../alerts/alert";
import useAlertContents from "@/utils/store/alertContents";
import { PIN } from "./PIN";

interface Props {
  email: string;
}

export const OTP = ({ email }: Props) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // alert
  // const { toggleModal, setToggleModal } = useToggleModal();
  // setToggleModal(true);
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const { setAlertProps } = useAlertContents();
  //
  const router = useRouter();

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
    console.log(data);
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", otp);
    const res = await fetch("/auth/otp", { method: "post", body: formData });
    setProgress(50);
    const { error, message } = await res.json();
    setTimeout(() => {
      setIsLoading(false);
      setProgress(99);
    }, 1000);
    setProgress(100);
    setOtp("");

    if (message === "Verify requires either a token or a token hash") {
      console.log("error");
      //
      setAlertProps(
        "error",
        "Code Error",
        "Please check your code and try again."
      );
      onOpen();
    }
    if (message === "Token has expired or is invalid") {
      console.log("error");
      setAlertProps("error", "Token Error", "Token has expired or is invalid.");
      onOpen();
    }
    if (!error) {
      router.replace("/welcome");
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP();
    }
  }, [otp]);

  return (
    <>
      {/*  */}
      <Alert
        key={"alert"}
        title=""
        body=""
        useDisclosure={{ onOpen, isOpen, onClose, onOpenChange }}
      />
      {/*  */}
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {email}</p>
              </div>
            </div>
            <div>
              <form action="#" method="post">
                <div className="flex justify-center">
                  <OTPInput
                    shouldAutoFocus
                    inputType="number"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="bg-gray-100 py-3 mx-1 rounded-md shadow-small"
                        style={{ textAlign: "center", width: "100%" }}
                      />
                    )}
                    onPaste={handlePaste}
                  />
                </div>

                <div className="pt-8">
                  <Button
                    color="primary"
                    fullWidth
                    onClick={verifyOTP}
                    isLoading={isLoading}
                  >
                    Confirm
                  </Button>
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
