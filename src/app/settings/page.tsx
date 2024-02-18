import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";

const SettingsPage = async () => {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return (
      <div>
        <SignOutButton />
      </div>
    );
  }
};

export default SettingsPage;
