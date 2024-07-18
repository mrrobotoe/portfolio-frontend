import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "@/lib/auth";

import { issuesLoader } from "./app/backlog";
import { projectsLoader } from "./app/dashboard";
import { AppRoot } from "./app/root";

const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/auth/register",
      lazy: async () => {
        const { RegisterRoute } = await import("./auth/register");
        return { Component: RegisterRoute };
      },
    },
    {
      path: "/auth/login",
      lazy: async () => {
        const { LoginRoute } = await import("./auth/login");
        return { Component: LoginRoute };
      },
    },
    {
      path: "/auth/create-team",
      lazy: async () => {
        const { CreateTeamRoute } = await import("./auth/create-team");
        return { Component: CreateTeamRoute };
      },
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "backlog",
          lazy: async () => {
            const { BacklogRoute } = await import("./app/backlog/backlog");
            return { Component: BacklogRoute };
          },
          loader: issuesLoader(queryClient),
        },
        {
          path: "messages",
          lazy: async () => {
            const { MessagesRoute } = await import("./app/message/messages");
            return { Component: MessagesRoute };
          },
        },
        {
          path: "issues",
          lazy: async () => {
            const { IssuesRoute } = await import("./app/issues");
            return { Component: IssuesRoute };
          },
          loader: async () => {
            const issues = issuesLoader(queryClient);
            const projects = projectsLoader(queryClient);
            return { issues, projects };
          },
        },
        {
          path: "issues/:issueId",
          lazy: async () => {
            const { IssueRoute } = await import("./app/issues/issue");
            return { Component: IssueRoute };
          },
        },
        {
          path: "issues/create-issue",
          lazy: async () => {
            const { CreateIssueRoute } = await import(
              "./app/issues/create-issue"
            );
            return { Component: CreateIssueRoute };
          },
          loader: projectsLoader(queryClient),
        },
        {
          path: "",
          lazy: async () => {
            const { DashboardRoute } = await import("./app/dashboard");
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);

export { createRouter };
