import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { createIssueInputSchema, useCreateIssue } from "../api/create-issue";

const CreateIssue = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createIssueInputSchema>>({
    resolver: zodResolver(createIssueInputSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Open",
    },
  });

  const createIssueMutation = useCreateIssue({
    mutationConfig: {
      onSuccess: () => {
        toast({
          title: "Issue created",
          variant: "success",
        });
        form.reset();
      },
    },
  });

  const onSubmit = (values: z.infer<typeof createIssueInputSchema>) => {
    createIssueMutation.mutate({ data: values });
  };

  return (
    <div className="create-issue">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="create-issue__form"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Short and descriptive.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={10} {...field} />
                </FormControl>
                <FormDescription>Provide more details.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      style={{ width: "148px" }}
                      className="create-issue__select"
                    >
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Backlog">Backlog</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Status of issue</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={createIssueMutation.isPending} type="submit">
            {createIssueMutation.isPending && (
              <Spinner size="md" variant="secondary" />
            )}
            {createIssueMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export { CreateIssue };
