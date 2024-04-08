import { Input } from "@nextui-org/react";
import { IconEye, IconEyeClosed, IconKey } from "@tabler/icons-react";

interface PasswordInputProps {
  passwordValue: string;
  setPasswordValue: (value: string) => void;
  isHidden: boolean;
  type: string;
  togglePasswordVisibility: () => void;
}

export const PasswordInput = ({
  passwordValue,
  setPasswordValue,
  isHidden,
  togglePasswordVisibility,
  type,
}: PasswordInputProps) => {
  return (
    <Input
      value={passwordValue}
      onChange={(e) => setPasswordValue(e.target.value)}
      type={!isHidden ? "text" : "password"}
      label={
        <div className="flex gap-[2px] items-center">
          <IconKey size={15} />
          <span>Password</span>
        </div>
      }
      name="password"
      autoComplete={type === "sign-in" ? "current-password" : "new-password"}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={togglePasswordVisibility}
        >
          {isHidden ? (
            <IconEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <IconEyeClosed className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      description={
        <span className="text-xs text-gray-600 dark:text-gray-300">
          Password must be at least 8 characters long.
        </span>
      }
    />
  );
};
