import { Button } from "@nextui-org/react";
import { IconX } from "@tabler/icons-react";

interface Props {
  MainIcon: (props: IconProps) => JSX.Element;
  text: string;
  buttonTitle: string;
  closeButton?: boolean;
}

export function Card1({
  MainIcon,
  closeButton = false,
  text,
  buttonTitle,
}: Props) {
  return (
    <section className="my-4 max-w-sm bg-white rounded-lg shadow-md p-6 relative mx-4">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
        {closeButton && <IconX className="w-6 h-6" />}
      </button>
      <div className="flex flex-col items-center justify-center space-y-4">
        <MainIcon className="w-16 h-16 text-indigo-500" />
        <div className="text-center">
          <h2 className="text-lg font-semibold">{text}</h2>
        </div>
        <Button className="w-full bg-indigo-600 text-white text-[15px] font-medium">
          {buttonTitle}
        </Button>
      </div>
    </section>
  );
}
