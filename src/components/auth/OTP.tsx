/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Alert } from "../alerts/alert";
import useToggleModal from "@/utils/store/alertContents";
import useAlertContents from "@/utils/store/alertContents";

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
                {/* <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16">
                    <Input type="number" name="1" id="1" maxLength={1} />
                  </div>
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn&apos;t recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div> */}
                <OTPInput
                  shouldAutoFocus
                  inputType="number"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={
                    <span className="px-[2px] text-gray-500">-</span>
                  }
                  renderInput={(props) => <Input {...props} />}
                  onPaste={handlePaste}
                />
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
