"use client";

import { Project } from "@prisma/client";
import { createNewTask } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { FormEvent } from "react";
import Select from "./Select";

Modal.setAppElement("#modal-task");

type NewTaskProps = {
  projects?: Project[];
};

const NewTask = ({ projects }: NewTaskProps) => {
  const [isModalOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);
  const [name, setName] = useState("");
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    await createNewTask(name, selectedProjectId);
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
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>

        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
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
          <Input
            placeholder="Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </>
  );
};

export default NewTask;
