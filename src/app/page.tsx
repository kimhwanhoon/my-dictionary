import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { redirect } from "next/navigation";

export const runtime = "edge";

const Home = async () => {
  const { isSession } = await checkUserSession();

  isSession ? redirect("/home") : redirect("/signin");

  return (
    <div className="h-full bg-main flex flex-col items-center justify-center"></div>
  );
};

export default Home;
