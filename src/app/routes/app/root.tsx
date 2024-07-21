import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Spinner } from "@/components/ui/spinner";

const AppRoot = () => {
  const location = useLocation();
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="centered">
            <Spinner />
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallback={<div>Something went wrong!</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </DashboardLayout>
  );
};

export { AppRoot };
