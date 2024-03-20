"use client";

import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { IconWorld } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, ReactNode, useEffect, useState } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLanguage = searchParams.get("lang");
  const currentWord = searchParams.get("search");
  const [inputValue, setInputValue] = useState<string>("");

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/dictionary?lang=${currentLanguage}&search=${inputValue}`);
  };

  const [selectedOption, setSelectedOption] = useState<string>("English");
  const [currentIcon, setCurrentIcon] = useState<ReactNode>(<></>);

  useEffect(() => {
    if (currentLanguage === "en") {
      setCurrentIcon("🇬🇧->🇬🇧");
    } else if (currentLanguage === "en-fr") {
      setCurrentIcon("🇬🇧->🇫🇷");
    } else if (currentLanguage === "fr-en") {
      setCurrentIcon("🇫🇷->🇬🇧");
    }
  }, [currentLanguage]);

  const descriptionsMap = {
    English: "🇬🇧",
    "English-french": "🇬🇧-🇫🇷",
    "French-English": "🇫🇷-🇬🇧",
  };

  const labelsMap: Record<string, string> = {
    English: "English",
    "English-french": "English-french",
    "French-English": "French-English",
  };

  const languageRedirect = (lang: string) => {
    router.replace(`?lang=${lang}&search=${currentWord}`);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        label={"Search words"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        startContent={<IconWorld color="gray" size={16} />}
      />
      <ButtonGroup variant="flat">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly className="text-lg w-full px-3">
              {currentIcon}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="language options"
            selectedKeys={selectedOption}
            selectionMode="single"
            onSelectionChange={() => setSelectedOption}
            className="max-w-[300px]"
          >
            <DropdownItem
              key="en"
              description={descriptionsMap["English"]}
              onClick={() => languageRedirect("en")}
            >
              {labelsMap["English"]}
            </DropdownItem>
            <DropdownItem
              key="en-fr"
              description={descriptionsMap["English-french"]}
              onClick={() => languageRedirect("en-fr")}
            >
              {labelsMap["English-french"]}
            </DropdownItem>
            <DropdownItem
              key="fr-en"
              description={descriptionsMap["French-English"]}
              onClick={() => languageRedirect("fr-en")}
            >
              {labelsMap["French-English"]}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </form>
  );
};
