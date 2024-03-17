"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface ToastContentProps {
  title: string;
  body: string | ReactNode;
  button?: {
    title: string;
    color: ButtonProps["color"];
    onClick?: () => void;
  };
}

export const ToastContent = ({ title, body, button }: ToastContentProps) => {
  return (
    <div className="flex flex-col items-center">
      <h6 className="w-full font-medium">{title}</h6>
      <p className="w-full text-sm">{body}</p>
      {button && (
        <Button
          fullWidth
          size="sm"
          className="text-sm font-medium my-2"
          color={button.color}
          onClick={button.onClick ? button.onClick : () => undefined}
        >
          {button.title}
        </Button>
      )}
    </div>
  );
};
