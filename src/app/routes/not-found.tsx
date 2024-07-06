import * as React from "react";

import { Link } from "@/components/ui/link";

const NotFoundRoute = () => {
  return (
    <div className="not-found">
      <h1>Not Found</h1>
      <Link className="not-found__link" to="/">
        Go Home
      </Link>
    </div>
  );
};

export { NotFoundRoute };
