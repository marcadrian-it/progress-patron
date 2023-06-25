"use client";
import { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import IssueCard from "./IssueCard";
import { Prisma, ISSUE_STATUS } from "@prisma/client";
import { updateIssueStatus } from "@/utilities/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";

const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);

const issueWithProject = Prisma.validator<Prisma.IssueArgs>()({
  include: {
    project: true,
  },
});

type issueWithProject = Prisma.IssueGetPayload<typeof issueWithProject>;

const IssuesList: FC<{ issues: issueWithProject[] }> = ({ issues }) => {
  const [activeDroppableId, setActiveDroppableId] = useState(null);

  const router = useRouter();
  const severityMap = {
    Critical: 3,
    High: 2,
    Medium: 1,
    Low: 0,
  };

  const openIssues = issues
    .filter((issue) => issue.status === "OPEN")
    .sort((a, b) => severityMap[b.severity] - severityMap[a.severity]);
  const inProgressIssues = issues
    .filter((issue) => issue.status === "IN_PROGRESS")
    .sort((a, b) => severityMap[b.severity] - severityMap[a.severity]);
  const closedIssues = issues
    .filter((issue) => issue.status === "CLOSED")
    .sort((a, b) => severityMap[b.severity] - severityMap[a.severity]);

  const onDragUpdate = (update: any) => {
    setActiveDroppableId(update.destination?.droppableId);
  };

  const onDragEnd = async (result: any) => {
    setActiveDroppableId(null);
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let newStatus: ISSUE_STATUS | undefined;
    if (destination.droppableId === "openIssues") {
      newStatus = "OPEN";
    } else if (destination.droppableId === "inProgressIssues") {
      newStatus = "IN_PROGRESS";
    } else if (destination.droppableId === "closedIssues") {
      newStatus = "CLOSED";
    }

    if (newStatus) {
      await updateIssueStatus(draggableId, newStatus);
      router.refresh();
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <div className="grid grid-cols-3 gap-6 w-full h-full">
          <Droppable droppableId="openIssues">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-3xl p-6 sm:p-0  ${
                  activeDroppableId === "openIssues" ? "bg-blue-100" : ""
                }`}
              >
                <h2
                  className={`sticky top-0 text-2xl text-center text-black font-bold mb-4 py-2 px-4 border-2 border-white rounded ${
                    activeDroppableId === "openIssues"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600"
                      : "bg-gradient-to-br from-blue-400 to-blue-500"
                  }`}
                  style={{ position: "sticky", top: 0, zIndex: 1 }}
                >
                  Open
                </h2>
                <div className="space-y-4">
                  {openIssues.map((issue, index) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <IssueCard
                            key={issue.id}
                            issue={issue}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="inProgressIssues">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-3xl p-6 sm:p-0 ${
                  activeDroppableId === "inProgressIssues"
                    ? "bg-yellow-100"
                    : ""
                }`}
              >
                <h2
                  className={`sticky top-0 text-2xl text-center text-black font-bold mb-4 py-2 px-4 border-2 border-white rounded ${
                    activeDroppableId === "inProgressIssues"
                      ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
                      : "bg-gradient-to-br from-yellow-400 to-yellow-500"
                  }`}
                  style={{ position: "sticky", top: 0, zIndex: 1 }}
                >
                  In Progress
                </h2>
                <div className="space-y-4">
                  {inProgressIssues.map((issue, index) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <IssueCard
                            issue={issue}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <Droppable droppableId="closedIssues">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-3xl p-6 sm:p-0 ${
                  activeDroppableId === "closedIssues" ? "bg-green-100" : ""
                }`}
              >
                <h2
                  className={`sticky top-0 text-2xl text-center text-black font-bold mb-4 py-2 px-4 border-2 border-white rounded ${
                    activeDroppableId === "closedIssues"
                      ? "bg-gradient-to-br from-green-500 to-green-600"
                      : "bg-gradient-to-br from-green-400 to-green-500"
                  }`}
                  style={{ position: "sticky", top: 0, zIndex: 1 }}
                >
                  Closed
                </h2>

                <div className="space-y-4">
                  {closedIssues.map((issue, index) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <IssueCard
                            issue={issue}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
        <style>{`
        @media (max-width: 1240px) {
          .grid-cols-3 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
      </DragDropContext>
    </>
  );
};

export default IssuesList;
