import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  autoComplete?: string;
}

const Input = ({
  className,
  autoComplete,
  maxLength,
  ...props
}: InputProps) => {
  return (
    <input
      maxLength={maxLength}
      autoComplete={autoComplete}
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-black",
        className
      )}
      {...props}
    />
  );
};

export default Input;
