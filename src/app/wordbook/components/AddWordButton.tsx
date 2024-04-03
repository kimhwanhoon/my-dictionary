"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconAbc, IconBracketsContain } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  listName: string;
}

export const AddWordButton = ({ listName }: Props) => {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen,
    onOpen: openModal,
    onOpenChange,
    onClose: closeModal,
  } = useDisclosure();

  const addWordHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { error, message } = await fetch("/api/wordbook/add-word", {
        method: "POST",
        body: JSON.stringify({ word, listName, definition }),
      }).then((res) => res.json());
      if (error) {
        throw new Error(message);
      } else {
        console.log("word added.");
        setWord("");
        setDefinition("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
      router.refresh();
    }
  };

  useEffect(() => {
    if (word.length > 0 && definition.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [word, definition]);

  return (
    <>
      <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(closeModal) => (
            <form onSubmit={(e) => addWordHandler(e)}>
              <ModalHeader className="flex flex-col gap-1">
                Add a word - {listName}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <Input
                    maxLength={20}
                    startContent={<IconAbc size={"1.2rem"} />}
                    name="word"
                    size="md"
                    label="New word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    autoComplete="off"
                    required
                    description="Add a word or sentence to the list."
                  />
                  <Input
                    maxLength={20}
                    startContent={<IconBracketsContain size={"1.2rem"} />}
                    name="definition"
                    size="md"
                    label="New definition"
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    autoComplete="off"
                    required
                    description="Add a definition to the word or sentence."
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  className="disabled:opacity-50"
                  isDisabled={isDisabled}
                  color="primary"
                  type="submit"
                >
                  Add
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <Button color="primary" fullWidth onPress={openModal}>
        Add a word
      </Button>
    </>
  );
};
