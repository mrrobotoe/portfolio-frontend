import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const spinnerVariants = cva("loader", {
  variants: {
    variant: {
      primary: "loader--color-primary",
      secondary: "loader--color-secondary",
    },
    size: {
      xs: "loader--size-xs",
      sm: "loader--size-sm",
      md: "loader--size-md",
      lg: "loader--size-lg",
      xl: "loader--size-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = ({ size, variant }: SpinnerProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx(spinnerVariants({ size, variant }))}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  );
};

export { Spinner };
