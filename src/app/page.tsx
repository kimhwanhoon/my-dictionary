import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

const Home = async () => {
  const { isSession, userData } = await checkUserSession();

  isSession ? redirect("/home") : redirect("/signin");

  return (
    <div className="h-full bg-main flex flex-col items-center justify-center"></div>
  );
};

export default Home;
