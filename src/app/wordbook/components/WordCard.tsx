"use client";

import { WordType } from "@/types/supabaseTypes";
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
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import parse from "html-react-parser";
import { deleteWordFromWordbook } from "@/utils/wordbook/deleteWord";
import { useRouter } from "next/navigation";

interface Props {
  word: WordType["word"];
  definition: WordType["definition"];
  originalDefinition: WordType["original_definition"];
  wordbookId: string;
}

export const WordCard = ({
  word,
  definition,
  originalDefinition,
  wordbookId,
}: Props) => {
  const {
    isOpen,
    onOpen: openModal,
    onOpenChange,
    onClose: closeModal,
  } = useDisclosure();

  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const definitionRef = React.useRef<HTMLTextAreaElement>(null);
  console.log(isEditing);
  console.log(definition);
  const cardOnClickHandler = () => {
    openModal();
  };

  const CardDetailModal = () => (
    <>
      <Card className="w-full max-h-[calc(90dvh)]">
        <CardHeader onClick={cardOnClickHandler}>
          <p className="pt-2 text-xl w-full text-center font-medium text-gray-800 dark:text-gray-100">
            {word}
          </p>
        </CardHeader>
        {definition && <Divider />}
        <ScrollShadow hideScrollBar>
          <CardBody onClick={cardOnClickHandler}>
            <div>
              {isEditing ? (
                <Textarea
                  className="w-full text-center text-15 text-gray-700 dark:text-gray-200 border-none"
                  ref={definitionRef}
                  defaultValue={definition ?? ""}
                  isDisabled={!isEditing}
                  description={
                    <p className="text-left">
                      Edit the definition of the word. You cannot edit original
                      definition from dictionary.
                    </p>
                  }
                ></Textarea>
              ) : definition && !isEditing ? (
                <div className="">
                  <h4 className="text-15 font-medium text-center">
                    Custom definition
                  </h4>
                  <p className="w-full text-15 text-gray-700 dark:text-gray-200 border-none py-4">
                    {definition}
                  </p>
                </div>
              ) : null}
              {originalDefinition && <Divider />}
              <div className="py-4">
                {originalDefinition && parse(originalDefinition)}
              </div>
            </div>
          </CardBody>
        </ScrollShadow>
        <Divider />
        <CardFooter className="min-h-[60px]">
          <div className="flex gap-2 w-full">
            {!isEditing ? (
              <Button
                className="w-full dark:text-gray-100"
                fullWidth
                color="primary"
                variant="flat"
                onClick={() => {
                  if (confirm("Do you really want to edit this word?")) {
                    setIsEditing(true);
                  }
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                className="w-full dark:text-gray-100"
                fullWidth
                color="primary"
                variant="flat"
                onClick={async () => {
                  const updatedDefinition = definitionRef.current?.value;
                  if (confirm("Do you really want to save this word?")) {
                    setIsEditing(false);
                    // save the updated definition
                    const { error } = await fetch("/api/wordbook/update-word", {
                      method: "POST",
                      body: JSON.stringify({
                        word,
                        wordbookId,
                        updatedDefinition,
                      }),
                    }).then((res) => res.json());
                    if (error) {
                      console.error("Failed to save the word.");
                    } else {
                      closeModal();
                      router.refresh();
                    }
                  }
                }}
              >
                Save
              </Button>
            )}
            <Button
              className="w-full"
              fullWidth
              color="danger"
              variant="flat"
              onClick={async () => {
                if (confirm("Do you really want to delete this word?")) {
                  if (await deleteWordFromWordbook({ word, wordbookId })) {
                    closeModal();
                    router.refresh();
                  } else {
                    console.error("Failed to delete the word.");
                  }
                }
              }}
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );

  return (
    <>
      <Modal
        key={"word-card-modal"}
        closeButton
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          <CardDetailModal />
        </ModalContent>
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
