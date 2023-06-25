import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {}

const Select = ({ className, ...props }: SelectProps) => {
  return (
    <select
      className={clsx(
        " border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-inter",
        className
      )}
      {...props}
    />
  );
};

export default Select;
