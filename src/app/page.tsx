import { LaunchAnimation } from "@/components/animations/launch/LaunchAnimation";
import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const { isSession, userData } = await checkUserSession();
  const cookieStore = cookies();

  const isLoadingAlreadyPlayed =
    cookieStore.get("loadingAnimationPlayed")?.value === "true" ? true : false;

  if (isLoadingAlreadyPlayed) {
    isSession ? redirect("/welcome") : redirect("/signin");
  }

  return (
    <div className="h-full bg-main flex flex-col items-center justify-center">
      {isLoadingAlreadyPlayed || <LaunchAnimation isSession={isSession} />}
    </div>
  );
};

export default Home;
