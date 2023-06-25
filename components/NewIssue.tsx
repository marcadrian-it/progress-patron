"use client";

import { Issue, Project, ISSUE_SEVERITY } from "@prisma/client";
import { createNewIssue } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { FormEvent } from "react";
import Select from "./Select";
import TextArea from "./TextArea";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal-issue");

type NewIssueProps = {
  projects?: Project[];
};

const NewIssue = ({ projects }: NewIssueProps) => {
  const router = useRouter();
  const [isModalOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    projects && projects.length ? projects[0].id : 0
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<ISSUE_SEVERITY>(
    ISSUE_SEVERITY.Medium
  );
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    await createNewIssue(name, selectedProjectId, severity, description);
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
        + New Issue
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/3 md:w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Issue</h1>

        <form
          className="flex flex-col items-center gap-4 p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-1/2">
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
              placeholder="Issue name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextArea
              placeholder="Issue description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as ISSUE_SEVERITY)}
            >
              <option value={ISSUE_SEVERITY.Low}>Low</option>
              <option value={ISSUE_SEVERITY.Medium}>Medium</option>
              <option value={ISSUE_SEVERITY.High}>High</option>
              <option value={ISSUE_SEVERITY.Critical}>Critical</option>
            </Select>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewIssue;
