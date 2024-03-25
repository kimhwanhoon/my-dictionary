"use client";

import React, { SetStateAction } from "react";
import { toast } from "react-toastify";
import { ToastContent } from "../ToastContent";

interface Props {
  onSignUp: () => Promise<void>;
  onClose: any;
}

export const SignUpToast = ({ onSignUp, onClose }: Props) => {
  return toast.promise(onSignUp, {
    pending: {
      render() {
        return (
          <ToastContent
            key="signup"
            title="Please wait"
            body="Checking your email."
          />
        );
      },
    },
    success: {
      render() {
        return (
          <ToastContent
            key="signup"
            title="Success"
            body={
              <>
                Your email is available. 👌
                <br />
                We will sign you up shortly.
              </>
            }
          />
        );
      },
      onClose: () => {
        onClose();
      },
    },
    error: {
      render() {
        return (
          <ToastContent
            key="signup"
            title="Failed"
            body="Error occurred. Please try again. 🤯"
          />
        );
      },
    },
  });
};
