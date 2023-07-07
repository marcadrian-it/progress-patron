"use client";
import { ISSUE_SEVERITY } from "@prisma/client";
import Button from "./Button";
import React, { useState, useRef, useEffect, Suspense } from "react";
import Spinner from "./Spinner";
import { updateIssueSeverity } from "@/utilities/api";
import { useRouter } from "next/navigation";

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low":
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-500";
    case "High":
      return "bg-red-500";
    case "Critical":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

type SeverityButtonsProps = {
  severity: ISSUE_SEVERITY;
  issueId: string;
};

const SeverityButtons: React.FC<SeverityButtonsProps> = ({
  severity,
  issueId,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [severityClicked, setSeverityClicked] = useState<ISSUE_SEVERITY | null>(
    null
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsRefreshing(false);
  }, [severity]);

  const handleClick = (clickedSeverity: ISSUE_SEVERITY) => {
    setShowButtons(true);
    setSeverityClicked(clickedSeverity);
  };

  const handleSeverityChange = async (newSeverity: ISSUE_SEVERITY) => {
    try {
      setIsRefreshing(true);
      setShowButtons(false);
      await updateIssueSeverity(issueId, newSeverity);
      await router.refresh();
      setSeverityClicked(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowButtons(false);
        setSeverityClicked(null);
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
          style={
            isRefreshing
              ? {
                  width: "120px",
                  height: "40px",
                  backgroundColor: "#D1D5DB",
                }
              : {}
          }
          className={` text-black font-semibold ${
            isRefreshing ? "" : "hover:text-white"
          } rounded py-1 px-2 ${getSeverityColor(severity)}`}
          onClick={() => handleClick(severity)}
          disabled={isRefreshing}
          label="change issue severity"
        >
          {isRefreshing ? (
            <div className="flex justify-center items-center">
              <Suspense fallback={<div>...</div>}>
                <Spinner className="border-black" />
              </Suspense>
            </div>
          ) : (
            <>
              {severity === "Low" && <span> Severity: {severity} </span>}
              {severity === "Medium" && <span> Severity: {severity} </span>}
              {severity === "High" && <span> Severity: {severity} </span>}
              {severity === "Critical" && <span> Severity: {severity} </span>}
            </>
          )}
        </Button>
      )}
      {showButtons && (
        <div className="flex flex-row gap-2">
          {severityClicked !== "Low" && (
            <Button
              className="rounded py-1 px-2 bg-green-500 hover:bg-green-700 text-black hover:text-white"
              intent="primary"
              size="small"
              onClick={() => handleSeverityChange("Low")}
              label="change issue severity to low"
            >
              <span> Low </span>
            </Button>
          )}
          {severityClicked !== "Medium" && (
            <Button
              className="rounded py-1 px-2 bg-yellow-500 hover:bg-yellow-600 text-black hover:text-white"
              intent="primary"
              size="small"
              onClick={() => handleSeverityChange("Medium")}
              label="change issue severity to medium"
            >
              <span> Medium </span>
            </Button>
          )}
          {severityClicked !== "High" && (
            <Button
              className="rounded py-1 px-2 bg-red-500 hover:bg-red-700 text-black hover:text-white"
              intent="primary"
              size="small"
              onClick={() => handleSeverityChange("High")}
              label="change issue severity to high"
            >
              <span> High </span>
            </Button>
          )}
          {severityClicked !== "Critical" && (
            <Button
              className="rounded py-1 px-2 bg-purple-500 hover:bg-purple-700 text-black hover:text-white"
              intent="primary"
              size="small"
              label="change issue severity to critical"
              onClick={() => handleSeverityChange("Critical")}
            >
              <span> Critical </span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SeverityButtons;
