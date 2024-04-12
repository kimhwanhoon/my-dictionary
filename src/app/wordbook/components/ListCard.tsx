"use client";

import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface Props {
  title: string;
  number: number;
}

export const ListCard = ({ title, number }: Props) => {
  const router = useRouter();
  const onClickHandler = useCallback(() => {
    router.push(`/wordbook/${title}`);
  }, [router, title]);

  return (
    <Card
      className="flex-col justify-center w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333333%-12px)] lg:w-[calc(20%-14px)] cursor-pointer"
      shadow="md"
    >
      <CardBody onClick={onClickHandler}>
        <div className="w-full text-center space-y-1">
          <p className="font-medium font-mono">{title}</p>
          <p className="font-sans w-full text-right text-xs text-gray-600 dark:text-gray-300">
            ({number} words)
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
