"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <Button
      className="max-w-[300px]"
      variant="faded"
      fullWidth
      onClick={signOut}
      endContent={<IconLogout />}
    >
      Sign Out
    </Button>
  );
};
