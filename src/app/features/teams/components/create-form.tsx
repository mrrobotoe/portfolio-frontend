import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

import { createTeamInputSchema, useCreateTeam } from "../api/create-team";

const CreateTeamForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createTeamInputSchema>>({
    resolver: zodResolver(createTeamInputSchema),
    defaultValues: {
      name: "",
    },
  });

  const createTeamMutation = useCreateTeam({
    mutationConfig: {
      onSuccess: () => {
        toast({
          title: "Team created",
          variant: "success",
        });
        onSuccess();
      },
    },
  });

  const onSubmit = (values: z.infer<typeof createTeamInputSchema>) => {
    createTeamMutation.mutate({ data: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="create-team-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Name of your team.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={createTeamMutation.isPending}
        >
          {createTeamMutation.isPending && (
            <Spinner variant="secondary" size="sm" />
          )}
          {createTeamMutation.isPending ? "Creating..." : "Create team"}
        </Button>
      </form>
    </Form>
  );
};

export { CreateTeamForm };
