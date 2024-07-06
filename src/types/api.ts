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
  teamId: string;
  bio: string;
}>;

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type Issue = Entity<{
  id: number;
  title: string;
  description: string;
  status: string;
  project: number;
  created_at: Date;
}>;

export type Project = Entity<{
  id: number;
  name: string;
  organization: number;
  issues: Issue[];
  createdAt: string;
  updatedAt: string;
}>;
