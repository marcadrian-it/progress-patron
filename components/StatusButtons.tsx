"use client"
import React, { useState, useRef, useEffect } from "react";
import { Circle, ArrowRightCircle, CheckCircle } from "react-feather";
import Button from "./Button";
import { updateTaskStatus } from "@/utilities/api";
import { TASK_STATUS } from "@prisma/client";

type StatusButtonsProps = {
  status: TASK_STATUS;
  taskId: number;
};

const StatusButtons: React.FC<StatusButtonsProps> = ({ status, taskId }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [statusClicked, setStatusClicked] = useState<TASK_STATUS | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (clickedStatus: TASK_STATUS) => {
    setShowButtons(true);
    setStatusClicked(clickedStatus);
  };

  const handleStatusChange = async (newStatus: TASK_STATUS) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setShowButtons(false);
      setStatusClicked(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowButtons(false);
        setStatusClicked(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref}>
      {!showButtons && (
        <Button
          intent="primary"
          size="medium"
          onClick={() => handleClick(status)}
          disabled={showButtons}
        >
          {status === "NOT_STARTED" && (
            <Circle className="text-red-400" strokeWidth={3} />
          )}
          {status === "STARTED" && (
            <ArrowRightCircle className="text-yellow-400" strokeWidth={3} />
          )}
          {status === "COMPLETED" && (
            <CheckCircle className="text-green-400" strokeWidth={3} />
          )}
        </Button>
      )}
      {showButtons && (
        <div className="flex flex-row">
          {statusClicked !== "NOT_STARTED" && (
            <Button
              intent="primary"
              size="small"
              onClick={() => handleStatusChange("NOT_STARTED")}
            >
              <Circle className="text-red-400" strokeWidth={3} />
            </Button>
          )}
          {statusClicked !== "STARTED" && (
            <Button
              intent="primary"
              size="small"
              onClick={() => handleStatusChange("STARTED")}
            >
              <ArrowRightCircle className="text-yellow-400" strokeWidth={3} />
            </Button>
          )}
          {statusClicked !== "COMPLETED" && (
            <Button
              intent="primary"
              size="small"
              onClick={() => handleStatusChange("COMPLETED")}
            >
              <CheckCircle className="text-green-400" strokeWidth={3} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusButtons;
