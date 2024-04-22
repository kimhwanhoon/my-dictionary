import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

export const OAuth = () => {
  const router = useRouter();
  const googleSignInHandler = async () => {
    const res = await fetch("/auth/google");
    const { data, error } = await res.json();

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      router.push(data.url);
    }
  };
  return (
    <div>
      <Button onClick={async () => await googleSignInHandler()}>Google</Button>
    </div>
  );
};
