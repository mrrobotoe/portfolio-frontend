import { priorities, properties } from "@/lib/utils";
import { Issue } from "@/types/api";

type IssueViewProps = {
  issue: Issue;
};

const IssueView = ({ issue }: IssueViewProps) => {
  const StatusIcon = properties[issue.status].icon;
  const PriorityIcon = priorities[issue.priority].icon;

  return (
    <div className="issue-view">
      <section className="issue-view__content">
        <h4 className="issue-view__content__header">{issue.title}</h4>
        <p className="issue-view__content__description">{issue.description}</p>
      </section>
      <aside className="issue-view__sidebar">
        <div className="issue-view__sidebar__header">
          <p>Properties</p>
        </div>
        <div className="issue-view__sidebar__properties">
          <div className="issue-view__sidebar__properties__property">
            <StatusIcon />
            <span>{issue.status}</span>
          </div>
          <div className="issue-view__sidebar__properties__property">
            <PriorityIcon />
            <span>{priorities[issue.priority].value}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export { IssueView };
