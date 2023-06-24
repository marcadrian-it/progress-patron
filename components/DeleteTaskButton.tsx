"use client"
import { Trash2 } from 'react-feather';
import { deleteTask } from '@/utilities/api';
import { useRouter } from 'next/navigation';

type DeleteTaskButtonProps = {
  taskId: number;
};

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const router = useRouter();
  const handleDelete = async (): Promise<void> => {
    await deleteTask(taskId);
    router.refresh();
  };

  return (
    <button onClick={handleDelete}>
      <Trash2 className="text-red-500 cursor-pointer" />
    </button>
  );
};

export default DeleteTaskButton;
