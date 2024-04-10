import { Input } from "@nextui-org/react";
import { IconMail } from "@tabler/icons-react";

interface EmailInputProps {
  emailValue: string;
  setEmailValue: (value: string) => void;
}

export const EmailInput = ({ emailValue, setEmailValue }: EmailInputProps) => {
  return (
    <Input
      type="email"
      label={
        <div className="flex gap-[2px] items-center">
          <IconMail size={15} />
          <span>Email</span>
        </div>
      }
      name="email"
      autoComplete="email"
      isClearable
      value={emailValue}
      onChange={(e) => setEmailValue(e.target.value)}
      onClear={() => setEmailValue("")}
    />
  );
};
