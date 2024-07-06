import * as React from "react";

import { Head } from "../seo";

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
          <h1 className="content-layout__header__title">{title}</h1>
        </div>
        <div className="content-layout__content">{children}</div>
      </div>
    </>
  );
};
