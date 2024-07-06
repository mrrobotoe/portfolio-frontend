import { cva, type VariantProps } from "class-variance-authority";
import { clsx as cn } from "clsx";
import * as React from "react";

const badgeVariants = cva("badge ", {
  variants: {
    variant: {
      default: "badge--default",
      secondary: "badge--secondary",
      warning: "badge--warning",
      outline: "badge--outline",
      success: "badge--success",
      destructive: "badge--destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
