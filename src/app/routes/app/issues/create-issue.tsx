import { CreateIssue } from "@/app/features/issues/components/create-issue";
import { ContentLayout } from "@/components/layouts/content-layout";

const CreateIssueRoute = () => {
  return (
    <ContentLayout title="Create Issue">
      <CreateIssue />
    </ContentLayout>
  );
};

export { CreateIssueRoute };
