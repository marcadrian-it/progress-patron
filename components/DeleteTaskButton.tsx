"use client";
import { Trash2 } from "react-feather";
import { deleteTask } from "@/utilities/api";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Spinner from "./Spinner";

type DeleteTaskButtonProps = {
  taskId: number;
};

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsRefreshing(false);
  }, [taskId]);

  const handleDelete = async (): Promise<void> => {
    setIsRefreshing(true);
    await deleteTask(taskId);
    await router.refresh();
  };

  return isRefreshing ? (
    <Suspense fallback={<div>...Loading</div>}>
      <Spinner />
    </Suspense>
  ) : (
    <button onClick={handleDelete} disabled={isRefreshing}>
      <Trash2 className="text-red-500 cursor-pointer" />
    </button>
  );
};

export default DeleteTaskButton;
