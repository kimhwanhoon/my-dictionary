"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
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
      className="flex-col justify-center py-2 w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333333%-16px)] lg:w-[calc(20%-16px)]"
      shadow="md"
    >
      <CardHeader>
        <p className="w-full text-center font-medium font-mono">
          {title}
          <span className="font-sans w-full text-right text-xs text-gray-600 dark:text-gray-300">
            ({number} words)
          </span>
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-center w-full">
          <Button
            className="w-[250px] text-gray-800 dark:text-slate-100 dark:bg-indigo-900"
            color="primary"
            variant="flat"
            onPress={onClickHandler}
          >
            See words
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
