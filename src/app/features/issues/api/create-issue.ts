import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Issue } from "@/types/api";

import { getIssuesQueryOptions } from "./get-issues";

const createIssueInputSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  status: z.enum(["Open", "Done", "In Progress", "Backlog"]),
  priority: z.enum(["Low", "Medium", "High"]),
});

type CreateIssueInput = z.infer<typeof createIssueInputSchema>;

const createIssue = ({ data }: { data: CreateIssueInput }): Promise<Issue> => {
  return api.post("/tracker/issues/", data);
};

type UseCreateIssueOptions = {
  mutationConfig?: MutationConfig<typeof createIssue>;
};

const useCreateIssue = ({ mutationConfig }: UseCreateIssueOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getIssuesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createIssue,
  });
};

export { useCreateIssue, type CreateIssueInput, createIssueInputSchema };
