import * as React from "react";

import { Head } from "../seo";
import { MobileNavigation } from "../ui/mobile-navigation";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="content-layout">
        <div className="content-layout__header">
          <MobileNavigation />
          <h1 className="content-layout__header__title">{title}</h1>
        </div>
        <div className="content-layout__content">{children}</div>
      </div>
    </>
  );
};
