"use client";

import { Database, WordType } from "@/types/supabaseTypes";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalContent,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import parse from "html-react-parser";

interface Props {
  word: WordType["word"];
  definition: WordType["definition"];
  originalDefinition: WordType["original_definition"];
}

export const WordCard = ({ word, definition, originalDefinition }: Props) => {
  const {
    isOpen,
    onOpen: openModal,
    onOpenChange,
    onClose: closeModal,
  } = useDisclosure();

  const cardOnClickHandler = () => {
    openModal();
  };

  const CardDetailModal = () => (
    <>
      <Card className="w-full h-[calc(90dvh)]">
        <CardHeader onClick={cardOnClickHandler}>
          <p className="pt-2 text-xl w-full text-center font-medium text-gray-800 dark:text-gray-100">
            {word}
          </p>
        </CardHeader>
        {definition && <Divider />}
        <ScrollShadow hideScrollBar>
          <CardBody onClick={cardOnClickHandler}>
            <div>
              <p className="w-full text-center text-15 text-gray-700 dark:text-gray-200">
                {definition}
              </p>
              {originalDefinition && <Divider />}
              {originalDefinition && parse(originalDefinition)}
            </div>
          </CardBody>
        </ScrollShadow>
        <Divider />
        <CardFooter className="min-h-[60px]">
          <div className="flex gap-2 w-full">
            {["Edit", "Delete"].map((el, i) => (
              <Button
                key={i}
                className="w-full"
                fullWidth
                color={el === "Edit" ? "primary" : "danger"}
                variant="flat"
              >
                {el}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </>
  );

  return (
    <>
      <Modal
        closeButton
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>{(closeModal) => <CardDetailModal />}</ModalContent>
      </Modal>
      <Card className="w-full cursor-pointer">
        <CardHeader onClick={cardOnClickHandler}>
          <p className="w-full text-center font-medium text-gray-800 dark:text-gray-100">
            {word}
          </p>
        </CardHeader>
      </Card>
    </>
  );
};
