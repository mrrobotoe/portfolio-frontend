import { QueryClient } from "@tanstack/react-query";

import { getProjectQueryOptions } from "@/app/features/projects/api/get-projects";
import { ContentLayout } from "@/components/layouts/content-layout";
import { useUser } from "@/lib/auth";

const projectsLoader = (queryClient: QueryClient) => async () => {
  const query = getProjectQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const DashboardRoute = () => {
  const user = useUser();

  return (
    <ContentLayout title={"Dashboard"}>
      <div className="dashboard">
        <h1 className="dashboard__header">
          Welcome <b>{`${user.data?.name}`}</b>
        </h1>
        <h5>
          Team: <span>{`${user.data?.team_name}`}</span>
        </h5>
        <p>
          This is the dashboard. You can add new projects, view existing ones,
          and manage your tasks.
        </p>
      </div>
    </ContentLayout>
  );
};

export { DashboardRoute, projectsLoader };
