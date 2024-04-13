"use client";

import { Link } from "@/components/links/Link";
import { stacks } from "@/sources/stacks";
import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { IconHelpCircle } from "@tabler/icons-react";

export const About = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const aboutClickHandler = () => {
    onOpen();
  };
  return (
    <>
      <Modal
        className="max-h-[90dvh] overflow-y-auto"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>About</ModalHeader>
              <ModalBody className="py-2">
                <div className="flex flex-col gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">My Dictionary</h2>
                    <p className="text-sm">Version 0.8.0</p>
                  </div>
                  <div className="text-sm">
                    <p>
                      This is a simple Next.js application that uses NextUI and
                      Supabase.
                    </p>
                    <p>
                      Created by{" "}
                      <Link
                        key={"hwanhoon"}
                        href="https://www.linkedin.com/in/kimhwanhoon/"
                      >
                        Hwanhoon Kim
                      </Link>
                    </p>
                  </div>

                  <p className="text-sm">
                    <Link
                      key={"source-code"}
                      href="https://github.com/kimhwanhoon/my-dictionary"
                    >
                      Source code
                    </Link>
                  </p>
                  <div className="space-y-1">
                    <h4>Stacks</h4>
                    <Accordion
                      motionProps={{
                        variants: {
                          enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            transition: {
                              height: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                duration: 1,
                              },
                              opacity: {
                                easings: "ease",
                                duration: 1,
                              },
                            },
                          },
                          exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: {
                                easings: "ease",
                                duration: 0.25,
                              },
                              opacity: {
                                easings: "ease",
                                duration: 0.3,
                              },
                            },
                          },
                        },
                      }}
                    >
                      {stacks.map(({ stack, detail }) => (
                        <AccordionItem
                          isCompact
                          key={stack}
                          aria-label={stack}
                          title={stack}
                          className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                        >
                          {detail}
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="max-w-[300px] mx-auto"
                  variant="bordered"
                  fullWidth
                  onClick={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        className="max-w-[300px]"
        variant="faded"
        fullWidth
        endContent={<IconHelpCircle size={18} />}
        onClick={aboutClickHandler}
      >
        About
      </Button>
    </>
  );
};
