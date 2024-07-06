import { clsx } from "clsx";
import * as React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

// export interface LinkProps extends HTMLAnchorElement {}

const Link = ({ children, ...props }: LinkProps) => {
  return (
    <RouterLink className={clsx("link", props.className)} {...props}>
      {children}
    </RouterLink>
  );
};

export { Link };
