"use client";

import { Project } from "@prisma/client";
import { createNewTask } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { FormEvent } from "react";
import Select from "./Select";
import DateInput from "./DateInput";
import TextArea from "./TextArea";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal-task");

type NewTaskProps = {
  projects?: Project[];
  project?: Project | null;
};

const NewTask = ({ projects, project }: NewTaskProps) => {
  const router = useRouter();
  const [isModalOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    project ? project.id : projects && projects.length ? projects[0].id : 0
  );
  const [name, setName] = useState("");
  const [due, setDue] = useState<Date | null>(null);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    await createNewTask(name, selectedProjectId, due!);
    router.refresh();
    closeModal();
  };

  return (
    <>
      <Button
        intent="text"
        className="text-violet-600"
        onClick={() => openModal()}
      >
        + New Task
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/3 md:w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>

        <form
          className="flex flex-col items-center gap-4 p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-1/2">
            {!project && (
              <Select
                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              >
                {projects &&
                  projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
              </Select>
            )}
            <Input
              placeholder="Task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <DateInput
              value={due?.toISOString().split("T")[0] || ""}
              onChange={(e) => setDue(new Date(e.target.value))}
            />
            <Button type="submit">Create</Button>
          </div>
          <div className="w-full md:w-1/2">
            <TextArea
              placeholder="Task description (optional)"
              maxLength={100}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewTask;
