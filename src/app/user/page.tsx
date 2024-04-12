import { Circles } from "@/components/auth/background/Circles";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { username: string };
}

const UserPage = async ({ searchParams }: Props) => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return (
      <div className="h-full p-4 text-center flex flex-col items-center justify-center gap-2 background">
        <div className="background z-0">
          <Circles />
        </div>
        <section className="px-8 py-12 rounded-xl shadow-large w-full mx-auto max-w-[400px] space-y-3 bg-slate-100 dark:bg-slate-900 bg-opacity-80 dark:bg-opacity-80">
          <h2 className="font-medium text-xl">UserPage</h2>
          <p className="font-sm">User page will be updated soon.</p>
        </section>
      </div>
    );
  }
};

export default UserPage;
