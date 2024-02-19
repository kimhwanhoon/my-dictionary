"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Database } from "@/types/supabaseTypes";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { IconConfetti } from "@tabler/icons-react";

type RenderDataType = Pick<
  Database["public"]["Tables"]["french_dictionary"]["Row"],
  "word" | "definition" | "example"
>;

interface Props {
  element: RenderDataType;
}

export const WordDetailModal = ({ element }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const saveToMyWordsList = async () => {
    try {
      const formData = new FormData();
      formData.append("word", element.word);
      formData.append("definition", JSON.stringify(element.definition));
      formData.append("example", JSON.stringify(element.example));

      const res = await fetch("/api/words", { method: "post", body: formData });
      const { error } = await res.json();

      if (error) {
        toast.error(<span>Error occurred.</span>);
      } else {
        console.log(123);
        toast.success(
          <div className="flex flex-col gap-0 p-2">
            <IconConfetti color="#777" />
            <span>Successfully added!</span>
          </div>
        );
      }
    } catch (error) {
      toast.error(<span>Error occurred.</span>);
    }
  };
  return (
    <>
      <span className="border-b-1 pt-1" onClick={onOpen}>
        {element.word}
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        shadow="md"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {element.word}
              </ModalHeader>
              <ModalBody>
                <div>
                  <p>{element.definition}</p>
                  <p>{element.example}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="border border-[#f33870] text-[#f33870] bg-transparent"
                  variant="shadow"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="shadow"
                  onPress={saveToMyWordsList}
                >
                  Add to my dictionary
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer
        closeButton={false}
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};
