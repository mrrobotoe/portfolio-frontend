import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useParams } from "react-router-dom";

import {
  getIssueQueryOptions,
  useIssue,
} from "@/app/features/issues/api/get-issue";
import { IssueView } from "@/app/features/issues/components/issue-view";
import { ContentLayout } from "@/components/layouts/content-layout";
import { Spinner } from "@/components/ui/spinner";

const issueLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const issueId = params.issueId as string;

    const issueQuery = getIssueQueryOptions(issueId);

    const promises = [
      queryClient.getQueryData(issueQuery.queryKey) ??
        (await queryClient.fetchQuery(issueQuery)),
    ] as const;

    const [issue] = await Promise.all(promises);

    return {
      issue,
    };
  };

const IssueRoute = () => {
  const params = useParams();
  const issueId = params.issueId as string;
  const issueQuery = useIssue({
    issueId,
  });

  if (issueQuery.isLoading) {
    return <Spinner />;
  }

  if (!issueQuery.data) return null;
  return (
    <>
      <ContentLayout title={"Issue Detail"}>
        <IssueView issueId={issueId} />
      </ContentLayout>
    </>
  );
};

export { IssueRoute, issueLoader };
