import clsx from "clsx";
import React from "react";

type SpinnerProps = {
    className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
    return (
        <div
            className={clsx(
                "w-[22px] h-[22px] rounded-full animate-spin border border-solid border-white-800 border-t-4",
                className
            )}
        ></div>
    );
};

export default Spinner;
