// import { clsx } from "clsx";
import * as React from "react";

import { MobileNavigation } from "../ui/mobile-navigation";
import { Navigation } from "../ui/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <Navigation />
      <MobileNavigation />
      <main className="dashboard-layout__content">{children}</main>
    </div>
  );
};

export { DashboardLayout };
