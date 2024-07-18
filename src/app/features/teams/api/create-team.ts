import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Team } from "@/types/api";

const createTeamInputSchema = z.object({
  name: z.string().min(1, "Required"),
});

type CreateTeamInput = z.infer<typeof createTeamInputSchema>;

const createTeam = ({ data }: { data: CreateTeamInput }): Promise<Team> => {
  return api.post("/tracker/teams/", data);
};

type UseCreateTeamOptions = {
  mutationConfig?: MutationConfig<typeof createTeam>;
};

const useCreateTeam = ({ mutationConfig }: UseCreateTeamOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["authenticated-user"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTeam,
  });
};

export { useCreateTeam, type CreateTeamInput, createTeamInputSchema };
