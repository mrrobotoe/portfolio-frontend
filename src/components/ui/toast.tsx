import { Cross1Icon } from "@radix-ui/react-icons";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";

const toastVariants = cva("toast", {
  variants: {
    variant: {
      default: "toast--default",
      success: "toast--success",
      destructive: "toast--destructive",
      warning: "toast--warning",
      info: "toast--info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const toastViewportVariants = cva("toast-viewport");
const toastActionVariants = cva("toast__action");
const toastCloseVariants = cva("toast__close");
const toastTitleVariants = cva("toast__title");
const toastDescriptionVariants = cva("toast__description");

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> &
    VariantProps<typeof toastViewportVariants>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Viewport
      className={clsx(toastViewportVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});
ToastViewport.displayName = ToastPrimitive.Root.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      className={clsx(toastVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> &
    VariantProps<typeof toastActionVariants>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={clsx(toastActionVariants(), className)}
      {...props}
    />
  );
});
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> &
    VariantProps<typeof toastCloseVariants>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Close
      className={clsx(toastCloseVariants(), className)}
      ref={ref}
      {...props}
    >
      <Cross1Icon />
    </ToastPrimitive.Close>
  );
});
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> &
    VariantProps<typeof toastTitleVariants>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Title
      className={clsx(toastTitleVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> &
    VariantProps<typeof toastDescriptionVariants>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Description
      className={clsx(toastDescriptionVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});
ToastDescription.displayName = ToastPrimitive.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
};
