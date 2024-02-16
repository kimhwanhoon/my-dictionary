import { FooterIcons } from "./Icons";
import { ClientHiddenFunctions } from "./ClientHiddenFunctions";

export const Footer = ({ url }: { url: string | null }) => {
  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-main w-full h-[90px] shadow-medium">
        <FooterIcons />
      </footer>
      <ClientHiddenFunctions url={url} />
    </>
  );
};
