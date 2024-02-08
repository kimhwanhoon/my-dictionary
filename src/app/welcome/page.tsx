import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Card1 } from "@/components/cards/Card1";
import { IconVocabulary } from "@tabler/icons-react";

export default async function PrivatePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div>
      <p>Hello {data.user.email}!</p>
      <Card1
        MainIcon={IconVocabulary}
        buttonTitle="Yes I am!"
        text="Are you ready to study?"
      />
    </div>
  );
}
