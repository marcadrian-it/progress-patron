import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {}

const Select = ({ className, ...props }: SelectProps) => {
  return (
    <select
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl",
        className
      )}
      {...props}
    />
  );
};

export default Select;
