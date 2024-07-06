import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Issue } from "@/types/api";

const getIssues = (): Promise<Issue[]> => {
  return api.get("/tracker/issues/");
};

const getIssuesQueryOptions = () => {
  return queryOptions({
    queryKey: ["issues"],
    queryFn: () => getIssues(),
  });
};

type UseIssuesOptions = {
  queryConfig?: QueryConfig<typeof getIssuesQueryOptions>;
};

const useIssues = ({ queryConfig }: UseIssuesOptions = {}) => {
  return useQuery({
    ...getIssuesQueryOptions(),
    ...queryConfig,
  });
};

export { getIssues, getIssuesQueryOptions, useIssues };
