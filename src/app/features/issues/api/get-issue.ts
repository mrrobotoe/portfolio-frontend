import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Issue } from "@/types/api";

const getIssue = ({ issueId }: { issueId: string }): Promise<Issue> => {
  return api.get(`/tracker/issues/${issueId}/`);
};

const getIssueQueryOptions = (issueId: string) => {
  return queryOptions({
    queryKey: ["issues", issueId],
    queryFn: () => getIssue({ issueId }),
  });
};

type UseIssueOptions = {
  issueId: string;
  queryConfig?: QueryConfig<typeof getIssueQueryOptions>;
};

const useIssue = ({ issueId, queryConfig }: UseIssueOptions) => {
  return useQuery({
    ...getIssueQueryOptions(issueId),
    ...queryConfig,
  });
};

export { getIssue, getIssueQueryOptions, useIssue };
