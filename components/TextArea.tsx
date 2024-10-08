import clsx from "clsx";
import React from "react";

import { ComponentPropsWithoutRef, useState } from "react";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
    maxLength?: number;
    // eslint-disable-next-line
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
    className,
    maxLength = 100,
    onChange,
    ...props
}: TextAreaProps) => {
    const [charsLeft, setCharsLeft] = useState(maxLength);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharsLeft(maxLength - event.target.value.length);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="relative">
            <textarea
                rows={5}
                maxLength={maxLength}
                onChange={handleChange}
                className={clsx(
                    "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-black",
                    className
                )}
                {...props}
            />
            <span className="absolute bottom-2 right-2 text-gray-500 text-sm p-4 select-none">
                {charsLeft}
            </span>
        </div>
    );
};

export default TextArea;
