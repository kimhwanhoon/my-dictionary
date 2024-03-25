import { checkUserSession } from "@/utils/supabase/sessionChecker";
import Link from "next/link";

export const Header = async () => {
  const { isSession } = await checkUserSession();
  return (
    <>
      {isSession ? (
        <>
          <div className="h-[60px]"></div>
          <header className="fixed top-0 left-0 right-0 h-[60px] w-full flex justify-center items-center bg-main">
            <Link
              className="cursor-pointer text-main-4 font-bold text-xl tracking-[0.015rem]"
              href="/"
            >
              Dictionary
            </Link>
          </header>
        </>
      ) : (
        <>
          <div className="h-[40px]"></div>
          <header className="fixed top-0 left-0 right-0 h-[70px] w-full flex justify-center items-center bg-main bg-opacity-10">
            <Link
              className="cursor-pointer text-main-5 font-extrabold text-2xl tracking-[0.015rem]"
              href="/"
            >
              Dictionary
            </Link>
          </header>
        </>
      )}
    </>
  );
};
