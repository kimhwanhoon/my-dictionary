/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { dictionaryLanguages } from "@/types/languages";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { IconChevronRight, IconWorld } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { type ReactNode, useState, useEffect } from "react";

interface Props {
  currentLanguage: string | null;
}

export const SelectLanguage = ({ currentLanguage }: Props) => {
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
      icon: "🇫🇷",
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentWord = searchParams.get("search");

  const [currentIcon, setCurrentIcon] = useState<ReactNode>(<></>);

  const languageRedirect = (lang: string) => {
    if (!currentWord) {
      router.replace(`?lang=${lang}`);
    } else {
      router.replace(`?lang=${lang}&search=${currentWord}`);
    }
  };

  const DropdownItems = languages.map((language) => (
    <DropdownItem
      key={language.key}
      description={language.desc}
      onPress={() => {
        languageRedirect(language.key);
        setCurrentIcon(language.icon);
      }}
    >
      <span className="text-gray-600 text-sm font-medium">
        {language.title}
      </span>
    </DropdownItem>
  ));

  // if url's lang params is different from what we offer, send them to '/dictionary'
  useEffect(() => {
    const selectedLanguage = dictionaryLanguages.find(
      (lang) => lang === currentLanguage || null
    );
    if (currentLanguage !== selectedLanguage) {
      router.replace("/dictionary");
    }
  }, []);

  useEffect(() => {
    // find if url's language matches with language.
    const selectedLanguage = languages.find(
      (language) => currentLanguage === language.key || null
    );
    if (!selectedLanguage) {
      setCurrentIcon(<IconWorld color="gray" size={16} />);
    } else {
      // if not matched, show default icon.
      setCurrentIcon(selectedLanguage.icon);
    }
  }, [currentLanguage]);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          className="flex h-full text-lg bg-transparent items-center"
        >
          {currentIcon}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Language Options" className="max-w-[300px]">
        {DropdownItems}
      </DropdownMenu>
    </Dropdown>
  );
};
