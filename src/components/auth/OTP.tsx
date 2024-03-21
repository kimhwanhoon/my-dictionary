/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { block } from "@/utils/block";
import { Button, Progress, useDisclosure } from "@nextui-org/react";
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

  // alert
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
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
    await block(1000);
    setIsLoading(false);
    setProgress(100);

    if (message === "Verify requires either a token or a token hash") {
      setOtp("");
      onOpen();
    }
    if (message === "Token has expired or is invalid") {
      setOtp("");
      onOpen();
    }
    if (!error) {
      setCodeMatched(true);
      await block(1000);
      router.replace("/");
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP();
    }
  }, [otp]);

  return (
    <div className="flex-col justify-center overflow-hidden bg-gray-50 py-12">
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
                {codeMatched ? (
                  <span className="text-gray-600 font-medium text-base">
                    CODE MATCHED
                  </span>
                ) : (
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
                )}
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
  );
};
