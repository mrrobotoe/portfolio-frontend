export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  team: string;
  team_name: string;
  team_acronym: string;
}>;

export type AuthResponse = {
  token: string;
};

export type Issue = Entity<{
  id: number;
  title: string;
  description: string;
  status: string;
  project: number;
  created_at: Date;
  team: string;
}>;

export type Project = Entity<{
  name: string;
  team: number;
  issues: Issue[];
  updatedAt: string;
}>;

export type Team = Entity<{
  name: string;
  description: string;
}>;
