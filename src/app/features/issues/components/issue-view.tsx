import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import { useIssue } from "../api/get-issue";

const IssueView = ({ issueId }: { issueId: string }) => {
  const issueQuery = useIssue({
    issueId,
  });

  if (!issueQuery.data) return null;

  if (issueQuery.isLoading) {
    return (
      <div className="centered">
        <Spinner size="xl" />
      </div>
    );
  }

  let badgeComponent = null;

  if (issueQuery.data.status === "Open") {
    badgeComponent = <Badge variant="outline">Open</Badge>;
  }
  if (issueQuery.data.status === "Done") {
    badgeComponent = <Badge variant="success">Done</Badge>;
  }
  if (issueQuery.data.status === "In Progress") {
    badgeComponent = <Badge variant="warning">In Progress</Badge>;
  }
  if (issueQuery.data.status === "Backlog") {
    badgeComponent = <Badge variant="secondary">Backlog</Badge>;
  }

  return (
    <div className="issue-view">
      <p>{issueQuery.data.description}</p>
      <Label>Status:</Label>
      {badgeComponent}
    </div>
  );
};

export { IssueView };
