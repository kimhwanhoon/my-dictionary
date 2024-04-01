"use client";

import { Button } from "@nextui-org/react";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useRef } from "react";

interface Props {
  url: string;
}

export const Audio = ({ url }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <Button size="sm" className="bg-primary-500 text-white" isIconOnly>
      <IconPlayerPlay
        onClick={() => {
          audioRef.current?.play();
        }}
      />
      <audio ref={audioRef}>
        <source src={url} type="audio/mpeg" />
      </audio>
    </Button>
  );
};
