/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useAlertContents from "@/utils/store/alertContents";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface AlertProps {
  title: string;
  body: string;
  useDisclosure: {
    getButtonProps?: any;
    getDisclosureProps?: any;
    isControlled?: any;
    isOpen?: any;
    onClose?: any;
    onOpen?: any;
    onOpenChange?: any;
  };
}

export const Alert = ({
  useDisclosure: {
    getButtonProps,
    getDisclosureProps,
    isControlled,
    isOpen,
    onClose,
    onOpen,
    onOpenChange,
  },
}: AlertProps) => {
  const { body, title } = useAlertContents();
  return (
    <Modal
      isOpen={isOpen}
      placement={"top-center"}
      onOpenChange={onOpenChange}
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "circInOut",
            },
          },
          exit: {
            y: -100,
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: "circInOut",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-rose-500">{title}</ModalHeader>
            <ModalBody className="text-sm">{body}</ModalBody>
            <ModalFooter>
              <Button fullWidth color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
