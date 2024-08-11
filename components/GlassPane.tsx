import clsx from "clsx";
import React from "react";

type GlassPaneProps = {
    children: React.ReactNode;
    className: string;
    style?: React.CSSProperties;
};

const GlassPane = ({ children, className, style }: GlassPaneProps) => {
    return (
        <div
            className={clsx(
                "glass rounded-2xl border-solid border-2 border-gray-200",
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
};

export default GlassPane;
