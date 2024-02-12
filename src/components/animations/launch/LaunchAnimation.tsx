"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  isSession: boolean;
}

export const LaunchAnimation = ({ isSession }: Props) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isCompleted) {
      const setCookie = async () => {
        const res = await fetch("/cookies/set");
        const data = await res.json();
        console.log(data);
      };
      setCookie();
      if (isSession) {
        router.replace("/welcome");
      } else {
        router.replace("/signin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  return (
    <DotLottiePlayer
      src="/launch.lottie"
      autoplay
      speed={1}
      onEvent={(e) => {
        if (e === "complete") {
          setIsCompleted(true);
        }
      }}
    />
  );
};
