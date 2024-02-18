import { Link } from "@nextui-org/react";

const WordsPage = () => {
  return (
    <div className="flex flex-col p-4 bg-white h-dvh">
      <Link href={"/words/add"}>Add</Link>
      <Link href={"/words/list"}>List</Link>
    </div>
  );
};

export default WordsPage;
