import { QueryClient } from "@tanstack/react-query";

import { getIssuesQueryOptions } from "@/app/features/issues/api/get-issues";
import { IssuesList } from "@/app/features/issues/components/issues-list";
import { ContentLayout } from "@/components/layouts/content-layout";

const issuesLoader = (queryClient: QueryClient) => async () => {
  const query = getIssuesQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const IssuesRoute = () => {
  return (
    <ContentLayout title={"All Issues"}>
      <IssuesList status={"Open"} />
      <IssuesList status={"In Progress"} />
      <IssuesList status={"Backlog"} />
      <IssuesList status={"Done"} />
    </ContentLayout>
  );
};

export { IssuesRoute, issuesLoader };
