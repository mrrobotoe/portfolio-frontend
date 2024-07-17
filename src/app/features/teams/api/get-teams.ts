import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Team } from "@/types/api";

const getTeams = (): Promise<Team[]> => {
  return api.get("/tracker/teams/");
};

const getTeamsQueryOptions = () => {
  return queryOptions({
    queryKey: ["teams"],
    queryFn: () => getTeams(),
  });
};

type UseTeamsOptions = {
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

const useTeams = ({ queryConfig }: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions(),
    ...queryConfig,
  });
};

export { getTeams, getTeamsQueryOptions, useTeams };
