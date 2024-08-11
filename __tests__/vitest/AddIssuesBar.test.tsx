import AddIssuesBar from "../../components/AddIssuesBar";
import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { Project } from "@prisma/client";

vi.mock("react-modal", () => ({
    default: {
        setAppElement: vi.fn(),
    },
}));

vi.mock("../../components/Card", () => ({
    default: ({
        children,
        className,
    }: {
        children: React.ReactNode;
        className: string;
    }) => (
        <div data-testid="mock-card" className={className}>
            {children}
        </div>
    ),
}));

vi.mock("../../components/NewIssue", () => ({
    default: ({ projects }: { projects?: Project[] }) => (
        <div data-testid="mock-new-issue">
            NewIssue Component
            {projects && (
                <span data-testid="projects-count">{projects.length}</span>
            )}
        </div>
    ),
}));

describe("AddIssuesBar", () => {
    beforeAll(() => {
        document.body.innerHTML = '<div id="modal-issue"></div>';
    });

    it("renders without crashing", () => {
        render(<AddIssuesBar />);
        expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    });

    it("renders with correct className", () => {
        render(<AddIssuesBar />);
        const card = screen.getByTestId("mock-card");
        expect(card).toHaveClass(
            "w-full py-4 relative h-20 mb-4 sm:text-center"
        );
    });

    it("renders NewIssue component", () => {
        render(<AddIssuesBar />);
        expect(screen.getByTestId("mock-new-issue")).toBeInTheDocument();
    });

    it("passes projects prop to NewIssue component", () => {
        const mockProjects: Project[] = [
            {
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "Project 1",
                description: "Description 1",
                due: new Date(),
                deleted: false,
                ownerId: 1,
            },
            {
                id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: "Project 2",
                description: null,
                due: new Date(),
                deleted: false,
                ownerId: 2,
            },
        ];
        render(<AddIssuesBar projects={mockProjects} />);
        expect(screen.getByTestId("mock-new-issue")).toBeInTheDocument();
        expect(screen.getByTestId("projects-count")).toHaveTextContent("2");
    });

    it("handles undefined projects prop", () => {
        render(<AddIssuesBar />);
        expect(screen.getByTestId("mock-new-issue")).toBeInTheDocument();
        expect(screen.queryByTestId("projects-count")).not.toBeInTheDocument();
    });
});
