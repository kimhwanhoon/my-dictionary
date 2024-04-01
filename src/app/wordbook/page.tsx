import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

const WordbookPage = async () => {
  const { isSession } = await checkUserSession();
  if (!isSession) {
    redirect("/signin");
  } else {
    return <div>Wordbook</div>;
  }
};

export default WordbookPage;
