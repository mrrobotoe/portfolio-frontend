import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router-dom";
import { z } from "zod";

import { User } from "@/types/api";

import { api } from "./api-client";

const loginUser = async (data: LoginInput) => {
  const response = await api.post("/user/token/", data);
  sessionStorage.setItem("portfolio-token", response.token);
  const user = await getUser();
  return user;
};

const getUser = async (): Promise<User | null> => {
  if (sessionStorage.getItem("portfolio-token") === null) {
    return null;
  }

  return api.get("/user/me/");
};

const registerUser = async (data: RegisterInput): Promise<User | null> => {
  const values = {
    email: data.email,
    password: data.password,
    name: `${data.firstName} ${data.lastName}`,
  };

  await api.post("/user/create/", values);

  const userResponse = await loginUser({
    email: data.email,
    password: data.password,
  });

  return userResponse;
};

const logoutUser = async () => {
  await sessionStorage.clear();
};

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters",
  }),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const authConfig = {
  userFn: getUser,
  loginFn: loginUser,
  registerFn: registerUser,
  logoutFn: logoutUser,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
