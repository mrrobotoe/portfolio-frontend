import BarGraph1 from "../assets/BarGraph1.svg?react";
import BarGraph2 from "../assets/BarGraph2.svg?react";
import CheckCircleIcon from "../assets/CheckCircleIcon.svg?react";
import CircleIcon from "../assets/CircleIcon.svg?react";
import CloseCircleIcon from "../assets/CloseCircleIcon.svg?react";
import DotCircleIcon from "../assets/DotCircleIcon.svg?react";
import FullBarGraph from "../assets/FullBarGraph.svg?react";
import HalfCircleIcon from "../assets/HalfCircleIcon.svg?react";
export const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", dateOptions);

export const acronymn = (str: string) => {
  const words = str.split(" ");

  let abbreviation;

  if (words[0].length >= 5) {
    abbreviation = words[0][0] + words[0][2].toUpperCase() + words[1][0];
    return abbreviation;
  }

  return words[0][0] + words[1][0];
};

type Properties = {
  [key: string]: {
    icon: React.FC;
    value: string;
  };
};

type Priorities = {
  [key: string]: {
    icon: React.FC;
    value: string;
  };
};

export const priorities: Priorities = {
  Low: {
    icon: BarGraph1,
    value: "Low",
  },
  Medium: {
    icon: BarGraph2,
    value: "Medium",
  },
  High: {
    icon: FullBarGraph,
    value: "High",
  },
};

export const properties: Properties = {
  Open: {
    icon: CircleIcon,
    value: "Todo",
  },
  Backlog: {
    icon: DotCircleIcon,
    value: "Backlog",
  },
  Done: {
    icon: CheckCircleIcon,
    value: "Done",
  },
  Canceled: {
    icon: CloseCircleIcon,
    value: "Canceled",
  },
  Duplicate: {
    icon: CloseCircleIcon,
    value: "Duplicate",
  },
  "In Progress": {
    icon: HalfCircleIcon,
    value: "In Progress",
  },
  Priority: {
    icon: BarGraph1,
    value: "Priority",
  },
};
