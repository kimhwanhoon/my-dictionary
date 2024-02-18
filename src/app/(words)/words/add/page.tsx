import { Divider } from "@nextui-org/react";
import { WordInput } from "../components/Input";
import { WordsList } from "../components/WordsList";

const WordsAddPage = () => {
  return (
    <div className="flex flex-col p-4 bg-white h-dvh">
      <h1 className="text-center font-medium">Insert words</h1>
      <WordInput />
      <Divider className="my-2" />
      <h1 className="text-center font-medium mb-4">My words</h1>
      <WordsList />
    </div>
  );
};

export default WordsAddPage;
