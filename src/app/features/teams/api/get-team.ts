import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Team } from "@/types/api";

const getTeam = ({ teamId }: { teamId: string }): Promise<Team> => {
  return api.get(`/tracker/teams/${teamId}/`);
};

const getTeamQueryOptions = (teamId: string) => {
  return queryOptions({
    queryKey: ["teams", teamId],
    queryFn: () => getTeam({ teamId }),
  });
};

type UseTeamOptions = {
  teamId: string;
  queryConfig?: QueryConfig<typeof getTeamQueryOptions>;
};

const useTeam = ({ teamId, queryConfig }: UseTeamOptions) => {
  return useQuery({
    ...getTeamQueryOptions(teamId),
    ...queryConfig,
  });
};

export { getTeam, getTeamQueryOptions, useTeam };
