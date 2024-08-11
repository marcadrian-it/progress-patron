import clsx from "clsx";
import React from "react";

type CardProps = {
    className?: string;
    children?: React.ReactNode;
};

const Card = ({ className, children }: CardProps) => {
    return (
        <div
            className={clsx(
                "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
