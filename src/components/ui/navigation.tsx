import {
  Pencil1Icon,
  EnvelopeClosedIcon,
  DiscordLogoIcon,
  Pencil2Icon,
  ExitIcon,
  // LayersIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import { useLocation } from "react-router-dom";

import { useLogout } from "@/lib/auth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { Link } from "./link";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const Navigation = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ ...props }, ref) => {
  const logout = useLogout();
  const location = useLocation();

  return (
    <nav ref={ref} {...props}>
      <TooltipProvider>
        <ToggleGroup className="desktop-navigation" type="single">
          <Link
            className="desktop-navigation__link desktop-navigation__link__logo"
            to="/app"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  data-state={location.pathname === "/app" && "on"}
                  value="x"
                >
                  <DiscordLogoIcon />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="right">Roboto</TooltipContent>
            </Tooltip>
          </Link>
          {/* <Link className="desktop-navigation__link" to="/app/backlog">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  data-state={location.pathname === "/app/backlog" && "on"}
                  value="a"
                >
                  <LayersIcon />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent sideOffset={10} side="right">
                Backlog
              </TooltipContent>
            </Tooltip>
          </Link> */}
          <Link className="desktop-navigation__link" to="/app/messages">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  data-state={location.pathname === "/app/messages" && "on"}
                  value="b"
                >
                  <EnvelopeClosedIcon />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="right">Mail</TooltipContent>
            </Tooltip>
          </Link>
          <Link className="desktop-navigation__link" to="/app/issues">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  data-state={location.pathname === "/app/issues" && "on"}
                  value="a"
                >
                  <Pencil1Icon />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="right">Issues</TooltipContent>
            </Tooltip>
          </Link>
          <Link
            className="desktop-navigation__link"
            to="/app/issues/create-issue"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  data-state={
                    location.pathname === "/app/issues/create-issue" && "on"
                  }
                  value="a"
                >
                  <Pencil2Icon />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="right">Create Issue</TooltipContent>
            </Tooltip>
          </Link>
          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <ToggleGroupItem
                    className="desktop-navigation__logout"
                    value="d"
                  >
                    <ExitIcon />
                  </ToggleGroupItem>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Log out</TooltipContent>
            </Tooltip>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Make sure and save before logging out.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={() => logout.mutate({})}>Continue</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ToggleGroup>
      </TooltipProvider>
    </nav>
  );
});
Navigation.displayName = "Navigation";

export { Navigation };
