import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Project } from "@/types/api";

const getProjects = (): Promise<Project[]> => {
  return api.get("/tracker/projects/");
};

const getProjectQueryOptions = () => {
  return queryOptions({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
};

type UseProjectsOptions = {
  queryConfig?: QueryConfig<typeof getProjectQueryOptions>;
};

const useProjects = ({ queryConfig }: UseProjectsOptions = {}) => {
  return useQuery({
    ...getProjectQueryOptions(),
    ...queryConfig,
  });
};

export { getProjects, getProjectQueryOptions, useProjects };
