"use client";
import { createNewProject } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { FormEvent } from "react";

import { DatePicker } from "./DatePicker";
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
    <div className="px-6 py-8 flex justify-center items-center">
      <Button
        className="hover:scale-105 transition-all ease-in-out duration-200"
        onClick={() => openModal()}
      >
        + New Project
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/3 xl:w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form
          className="flex flex-col items-start gap-4 p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row sm:flex-col gap-2 w-full">
            <Input
              className="w-3/4 xl:w-2/3"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <DatePicker className="text-lg" value={due} setDue={setDue} />
          </div>
          <div className="w-full">
            <TextArea
              placeholder="Project description (optional)"
              maxLength={180}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <Button className="mt-4 w-1/3 sm:w-3/4 text-center" type="submit">
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
