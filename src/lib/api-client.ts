import type { Context } from "@netlify/edge-functions";
import Axios, { InternalAxiosRequestConfig } from "axios";

import { toast } from "@/components/ui/use-toast";
import { env } from "@/config/env";

const apiBaseURL = Netlify.env.get("VITE_APP_API_URL");

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.withCredentials = true;

  const token = sessionStorage.getItem("portfolio-token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
}

export const api = Axios.create({
  baseURL: apiBaseURL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.non_field_errors ||
      error.response?.data?.detail ||
      error.message;

    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get("redirectTo");
      window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  },
);
