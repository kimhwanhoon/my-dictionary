import { redirect } from "next/navigation";
import { checkUserSession } from "@/utils/supabase/sessionChecker";

export default async function PrivatePage() {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return (
      <div>
        <p>User email: {userData!.user.email}</p>
      </div>
    );
  }
}
