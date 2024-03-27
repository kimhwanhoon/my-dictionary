import { checkUserSession } from "@/utils/supabase/sessionChecker";
import { FooterIcons } from "./Icons";

export const Footer = async () => {
  const { isSession } = await checkUserSession();
  return (
    <>
      {isSession && (
        <footer className="fixed bottom-0 left-0 right-0 bg-main dark:bg-slate-900 w-full h-[70px] shadow-medium">
          <FooterIcons />
        </footer>
      )}
    </>
  );
};
