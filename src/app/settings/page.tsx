import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";

const SettingsPage = async () => {
  const { isSession } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return (
      <div className="p-4 flex flex-col w-full items-center">
        <SignOutButton />
      </div>
    );
  }
};

export default SettingsPage;
