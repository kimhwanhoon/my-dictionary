import { checkUserSession } from "@/utils/supabase/sessionChecker";
import Link from "next/link";
import { ThemeChanger } from "../theme/ThemeChanger";
import { Logo } from "../Logo";

export const Header = async () => {
  const { isSession } = await checkUserSession();
  return (
    <>
      {!isSession && (
        <>
          <div className="h-[60px]"></div>
          <header className="fixed top-0 left-0 right-0 h-[60px] bg-main dark:bg-indigo-800 ">
            <div className="relative flex w-full h-full justify-center items-center">
              <Link
                // className="cursor-pointer text-indigo-800 dark:text-white font-bold text-xl tracking-[0.015rem]"
                href="/"
              >
                {/* Dictionary */}
                <Logo customClass="text-2xl" />
              </Link>
              <ThemeChanger />
            </div>
          </header>
        </>
      )}
    </>
  );
};
