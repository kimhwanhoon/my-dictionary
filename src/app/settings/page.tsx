import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { About } from "./components/About";

const SettingsPage = async () => {
  const { isSession } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return (
      <div className="p-4 flex flex-col w-full items-center gap-2">
        <SignOutButton />
        <About />
      </div>
    );
  }
};

export default SettingsPage;
