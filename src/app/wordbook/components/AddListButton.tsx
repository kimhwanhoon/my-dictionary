"use client";

import {
  Button,
  ButtonProps,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconList } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  fullWidth?: boolean;
}

export const AddListButton = ({
  size = "md",
  variant = "solid",
  fullWidth = true,
}: Props) => {
  const router = useRouter();
  const [listValue, setListValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen,
    onOpen: openModal,
    onOpenChange,
    onClose: closeModal,
  } = useDisclosure();

  const addListHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { error, message } = await fetch("/api/wordbook/add-list", {
        method: "POST",
        body: JSON.stringify({ name: listValue }),
      }).then((res) => res.json());
      if (error) {
        throw new Error(message);
      } else {
        setListValue("");
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
    if (listValue.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [listValue]);

  return (
    <>
      <Modal
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => setListValue("")}
      >
        <ModalContent>
          {(closeModal) => (
            <form onSubmit={(e) => addListHandler(e)}>
              <ModalHeader className="flex flex-col gap-1">
                Add a list
              </ModalHeader>
              <ModalBody>
                <Input
                  maxLength={20}
                  startContent={<IconList size={"1rem"} />}
                  name="list"
                  size="md"
                  label="New list"
                  value={listValue}
                  onChange={(e) => setListValue(e.target.value)}
                  autoComplete="off"
                  required
                  description={
                    "Create a new list. You can add words to the list later."
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  className="disabled:opacity-50"
                  isDisabled={isDisabled}
                  color="primary"
                  type="submit"
                >
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <Button
        variant={variant}
        size={size}
        color="primary"
        fullWidth={fullWidth}
        onPress={openModal}
        className="dark:text-gray-200"
      >
        Add a list
      </Button>
    </>
  );
};
