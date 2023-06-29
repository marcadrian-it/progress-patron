"use client";
import { Plus, Trash2 } from "react-feather";
import { deleteTask } from "@/utilities/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import clsx from "clsx";

type DeleteTaskButtonProps = {
  taskId: number;
  className?: string;
};

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  taskId,
  className,
}) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPlusHovered, setIsPlusHovered] = useState(false);

  useEffect(() => {
    setIsRefreshing(false);
  }, [taskId]);

  const handleDelete = async (): Promise<void> => {
    setIsRefreshing(true);
    await deleteTask(taskId);
    await router.refresh();
  };

  const buttonClassName = clsx("text-red-500 cursor-pointer", className);

  return (
    <button
      className={buttonClassName}
      onClick={handleDelete}
      disabled={isRefreshing}
      onMouseEnter={() => setIsPlusHovered(true)}
      onMouseLeave={() => setIsPlusHovered(false)}
    >
      {isRefreshing ? (
        <Spinner />
      ) : (
        <>
          {isPlusHovered ? (
            <Trash2 className="text-red-500" />
          ) : (
            <Plus className="text-purple-500" strokeWidth={5} />
          )}
        </>
      )}
    </button>
  );
};

export default DeleteTaskButton;
