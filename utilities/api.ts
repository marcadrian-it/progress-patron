import { Issue, Project, User, ISSUE_STATUS } from "@prisma/client";

type FetcherProps = {
  url: string;
  method: string;
  body:
    | Partial<User>
    | Partial<Project>
    | Partial<Issue>
    | { name: string; projectId: number };
  json: boolean;
};

const fetcher = async ({ url, method, body, json = true }: FetcherProps) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: Partial<User>) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export const signin = async (user: Partial<User>) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};

export const createNewProject = async (name: string, due: Date) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name, due },
    json: true,
  });
};

export const createNewTask = async (
  name: string,
  projectId: number,
  due: Date
) => {
  return fetcher({
    url: "/api/task",
    method: "POST",
    body: { name, projectId, due },
    json: true,
  });
};

export const updateIssueStatus = async (id: string, status: ISSUE_STATUS) => {
  return fetcher({
    url: `/api/issue`,
    method: "PUT",
    body: { id, status },
    json: true,
  });
};

export const updateUserEmail = async (
  id: number,
  email: string,
  password: string
) => {
  return fetcher({
    url: `/api/user`,
    method: "PUT",
    body: { id, email, password },
    json: true,
  });
};
