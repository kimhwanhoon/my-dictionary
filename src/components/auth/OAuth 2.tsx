import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import React from "react";

export const OAuth = () => {
  const supabase = createClient();

  const signInWithAzure = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "offline_access",
      },
    });
    console.log(data, error);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
          redirectTo: `http://localhost:3000/auth/callback`,
        },
      },
    });

    console.log(data, error);
  };
  return (
    <div className="flex flex-col p-4 gap-3">
      <h2>Social Sign In</h2>
      <Button fullWidth onClick={signInWithAzure}>
        Microsoft
      </Button>
      <Button fullWidth onClick={signInWithGoogle}>
        Google
      </Button>
    </div>
  );
};
