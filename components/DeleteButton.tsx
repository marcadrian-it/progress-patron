"use client";
import React from "react";
import { XSquare } from "react-feather";
import { deleteIssue, deleteProject } from "@/utilities/api";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  variant: "project" | "issue";
  id: string | number;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ variant, id }) => {
  const router = useRouter();
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      if (variant === "issue") {
        await deleteIssue(id as string);
        router.refresh();
      } else if (variant === "project") {
        await deleteProject(id as number);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="absolute top-2 right-2 mt-2 mr-2 text-red-500 cursor-pointer hover:scale-110 hover:text-white hover:bg-red-800 hover:rounded hover:p-[2px]"
      onClick={handleClick}
    >
      <XSquare size={21} />
    </button>
  );
};
