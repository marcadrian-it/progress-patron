import React from "react";
import Card from "./Card";
import NewIssue from "./NewIssue";
import { Project } from "@prisma/client";

type AddIssueProps = {
  projects?: Project[];
};

const AddIssuesBar = ({ projects }: AddIssueProps) => {
  return (
    <>
      <Card className="w-full py-4 relative h-20 mb-4 sm:text-center">
        <NewIssue projects={projects} />
      </Card>
    </>
  );
};

export default AddIssuesBar;
