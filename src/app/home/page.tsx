import { redirect } from "next/navigation";
import { Card1 } from "@/components/cards/Card1";
import { IconVocabulary } from "@tabler/icons-react";
import { checkUserSession } from "@/utils/supabase/sessionChecker";

export default async function PrivatePage() {
  const { isSession, userData } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    // console.log(userData?.user.identities);
    return (
      <div>
        <p>User email: {userData!.user.email}</p>
      </div>
    );
  }
}
