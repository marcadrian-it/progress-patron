"use client";
import React from "react";
import { XSquare } from "react-feather";
import { deleteIssue, deleteProject } from "@/utilities/api";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface DeleteButtonProps {
    variant: "project" | "issue";
    id: string | number;
    // eslint-disable-next-line
    setIsDeleting: (value: boolean) => void;
    className?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
    variant,
    id,
    setIsDeleting,
    className,
}) => {
    const router = useRouter();
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            if (variant === "issue") {
                setIsDeleting(true);
                await deleteIssue(id as string);
                router.refresh();
            } else if (variant === "project") {
                setIsDeleting(true);
                await deleteProject(id as number);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const buttonClassName = clsx(
        "absolute top-2 right-2 mt-2 mr-2 text-red-500 cursor-pointer hover:scale-110 hover:text-white hover:bg-red-800 hover:rounded hover:p-[2px]",
        className
    );

    return (
        <button
            className={buttonClassName}
            onClick={handleClick}
            aria-label={`delete ${variant}`}
        >
            <XSquare size={21} />
        </button>
    );
};
