"use client";

import useSearchInputLanguageChanger from "@/store/searchInputLanguage";
import { Language } from "@/types/languages";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const languages = [
  {
    key: "en",
    title: "English",
    desc: "🇬🇧",
    icon: "🇬🇧",
  },
  {
    key: "en-fr",
    title: "English -> French",
    desc: "🇬🇧 -> 🇫🇷",
    icon: "🇫🇷",
  },
  {
    key: "fr-en",
    title: "French -> English",
    desc: "🇫🇷 -> 🇬🇧",
    icon: "🇬🇧",
  },
];

export const SelectLanguage = () => {
  const { language, setLanguage } = useSearchInputLanguageChanger();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {language === "en"
            ? languages[0].desc
            : language === "en-fr"
            ? languages[1].desc
            : language === "fr-en"
            ? languages[2].desc
            : languages[0].desc}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[language]}
        onAction={(e) => setLanguage(e.toString() as Language)}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.key} endContent={lang.desc}>
            {lang.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
