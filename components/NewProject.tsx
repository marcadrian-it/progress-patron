"use client";
import { createNewProject } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { FormEvent } from "react";
import DateInput from "./DateInput";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

const NewProject = () => {
  const router = useRouter();
  const [isModalOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [due, setDue] = useState<Date | null>(null);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !due || due === null) {
      closeModal();
      return;
    }
    await createNewProject(name, due);
    router.refresh();
    setName("");
    setDue(null);
    closeModal();
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/3 md:w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form
          className="flex flex-col items-center gap-4 p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-1/2">
            <Input
              placeholder="Project name"
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
              placeholder="Project description (optional)"
              maxLength={180}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
