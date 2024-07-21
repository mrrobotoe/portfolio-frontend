import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

import { MainErrorFallback } from "@/components/errors/main";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/toaster";
import { AuthLoader } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense
      fallback={
        <div className="centered">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <AuthLoader
              renderLoading={() => (
                <div className="centered">
                  <Spinner size="xl" />
                </div>
              )}
            >
              {children}
            </AuthLoader>
            {import.meta.env.DEV && <ReactQueryDevtools />}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
export { AppProvider };
