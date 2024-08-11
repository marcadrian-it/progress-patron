"use client";
import { createNewProject } from "@/utilities/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import TextArea from "./TextArea";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DatePicker } from "./DatePicker";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

interface ApiError extends Error {
    response: {
        status: number;
    };
}

const NewProject = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isModalOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [due, setDue] = useState<Date | null>(null);
    const [description, setDescription] = useState("");
    const closeModal = () => {
        setIsOpen(false);
        setName("");
        setDescription("");
        setDue(null);
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

    const handleError = (error: ApiError, errorMessage: string) => {
        if (error.response?.status === 400) {
            showToast(true, errorMessage);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name || !due || due === null) {
            showToast(
                true,
                "Please select a due date and a name of your project."
            );
            return;
        }
        try {
            await createNewProject(name, due, description);
        } catch (error) {
            handleError(
                error as ApiError,
                "A project with this name already exists or it was soft-deleted by you before."
            );
            return;
        }
        router.refresh();
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
                            maxLength={50}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <DatePicker
                            className="text-lg"
                            value={due}
                            setDue={setDue}
                        />
                    </div>
                    <div className="w-full">
                        <TextArea
                            placeholder="Project description (optional)"
                            maxLength={180}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <Button
                            className="mt-4 w-1/3 sm:w-3/4 text-center"
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default NewProject;
