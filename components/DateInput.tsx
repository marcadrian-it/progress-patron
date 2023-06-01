import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface DateInputProps extends ComponentPropsWithoutRef<"input"> {}

const DateInput = ({ className, ...props }: DateInputProps) => {
  return (
    <input
      type="date"
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
};

export default DateInput;
