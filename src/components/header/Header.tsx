import Link from "next/link";
import { ThemeChanger } from "../theme/ThemeChanger";
import { Logo } from "../Logo";
import { cookies } from "next/headers";

export const Header = async () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value;
  return (
    <>
      <div className="h-[60px]"></div>
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-main dark:bg-indigo-800 drop-shadow-md">
        <div className="relative flex w-full h-full justify-center items-center">
          <Link href="/">
            <Logo customClass="!text-2xl" />
          </Link>
          <ThemeChanger theme={theme} />
        </div>
      </header>
    </>
  );
};
