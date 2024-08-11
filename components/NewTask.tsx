"use client";

import { Project } from "@prisma/client";
import { createNewTask } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { FormEvent } from "react";
import Select from "./Select";

import { DatePicker } from "./DatePicker";
import TextArea from "./TextArea";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

Modal.setAppElement("#modal-task");

type NewTaskProps = {
    projects?: Project[];
    project?: Project | null;
};

const NewTask = ({ projects, project }: NewTaskProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isModalOpen, setIsOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number>(
        project ? project.id : projects && projects.length ? projects[0].id : 0
    );
    const [name, setName] = useState("");
    const [due, setDue] = useState<Date | null>(null);
    const [description, setDescription] = useState("");
    const closeModal = () => {
        setIsOpen(false);
        setName("");
        setDue(null);
        setDescription("");
    };
    const openModal = () => setIsOpen(true);

    const showToast = (isError: boolean, description: string) => {
        const variant = isError ? "destructive" : "destructive_message";

        toast({
            variant,
            title: isError ? "Error" : "Success",
            description,
            duration: 8000,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedProjectId) {
            showToast(true, "Please select a project.");
            return;
        }
        if (!name || !due || due === null) {
            showToast(
                true,
                "Please select a due date and a name of your task."
            );
            return;
        }
        await createNewTask(name, selectedProjectId, due!, description);
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
                className="w-1/3 xl:w-3/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6">New Task</h1>

                <form
                    className="flex flex-col items-center gap-4 p-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2 w-full items-start">
                        <div className="flex flex-row gap-2 w-3/4 lg:w-2/3 lg:flex-col">
                            {!project && (
                                <Select
                                    className="w-full"
                                    onChange={(e) =>
                                        setSelectedProjectId(
                                            Number(e.target.value)
                                        )
                                    }
                                >
                                    {projects &&
                                        projects.map((project) => (
                                            <option
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                </Select>
                            )}
                            <DatePicker
                                className="text-lg"
                                value={due}
                                setDue={setDue}
                            />
                        </div>
                        <Input
                            className="w-3/4 lg:w-full"
                            placeholder="Task name"
                            value={name}
                            maxLength={50}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <TextArea
                            placeholder="Task description (optional)"
                            maxLength={80}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <Button
                            className="w-1/3 sm:w-3/4 text-center"
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default NewTask;
