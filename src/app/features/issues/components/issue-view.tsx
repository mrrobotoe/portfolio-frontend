import { ValueIcon, LapTimerIcon } from "@radix-ui/react-icons";

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

  return (
    <div className="issue-view">
      <section className="issue-view__content">
        <h4 className="issue-view__content__header">{issueQuery.data.title}</h4>
        <p className="issue-view__content__description">
          {issueQuery.data.description}
        </p>
      </section>
      <aside className="issue-view__sidebar">
        <div className="issue-view__sidebar__header">
          <p>Properties</p>
        </div>
        <div className="issue-view__sidebar__properties">
          <div className="issue-view__sidebar__properties__property">
            <ValueIcon />
            <span>{issueQuery.data.status}</span>
          </div>
          <div className="issue-view__sidebar__properties__property">
            <LapTimerIcon />
            <span>Medium</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export { IssueView };
