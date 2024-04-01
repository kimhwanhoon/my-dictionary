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
import { IconList } from "@tabler/icons-react";
import { set } from "lodash";
import { FormEvent, useEffect, useState } from "react";

export const AddListButton = () => {
  const [listValue, setListValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen: openModal, onOpenChange } = useDisclosure();

  const addListHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const { error, message } = await fetch("/api/wordbook/addList", {
        method: "POST",
        body: JSON.stringify({ name: listValue }),
      }).then((res) => res.json());
      if (error) {
        throw new Error(message);
      } else {
        console.log("List created.");
        setListValue("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      <Button color="primary" fullWidth onPress={openModal}>
        Add a list
      </Button>
    </>
  );
};
