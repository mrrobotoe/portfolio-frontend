import { PanelRight } from "lucide-react";
import * as React from "react";
import { useLocation } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Toggle } from "./toggle";

const MobileNavigation = () => {
  const logout = useLogout();
  const location = useLocation();

  return (
    <nav className="mobile-navigation">
      <Sheet>
        <SheetTrigger asChild className={"mobile-navigation__open-menu"}>
          <Button
            className="mobile-navigation__open-menu__icon"
            variant="outline"
            size="icon"
          >
            <PanelRight />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Mr. Roboto</SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <div className="mobile-navigation__links">
            <Toggle
              className="mobile-navigation__links__toggle"
              data-state={location.pathname === "/app" ? "on" : "off"}
              asChild
            >
              <div className="mobile-navigation__links__toggle__link-item">
                <SheetClose asChild>
                  <Link
                    className="mobile-navigation__links__toggle__link-item__link"
                    to="/app"
                  >
                    Dashboard
                  </Link>
                </SheetClose>
              </div>
            </Toggle>
            <Toggle
              className="mobile-navigation__links__toggle"
              data-state={location.pathname === "/app/backlog" ? "on" : "off"}
              asChild
            >
              <div className="mobile-navigation__links__toggle__link-item">
                <SheetClose asChild>
                  <Link
                    className="mobile-navigation__links__toggle__link-item__link"
                    to="/app/backlog"
                  >
                    Backlog
                  </Link>
                </SheetClose>
              </div>
            </Toggle>
            <Toggle
              className="mobile-navigation__links__toggle"
              data-state={location.pathname === "/app/messages" ? "on" : "off"}
              asChild
            >
              <div className="mobile-navigation__links__toggle__link-item">
                <SheetClose asChild>
                  <Link
                    className="mobile-navigation__links__toggle__link-item__link"
                    to="/app/messages"
                  >
                    Messages
                  </Link>
                </SheetClose>
              </div>
            </Toggle>
            <Toggle
              className="mobile-navigation__links__toggle"
              data-state={location.pathname === "/app/issues" ? "on" : "off"}
              asChild
            >
              <div className="mobile-navigation__links__toggle__link-item">
                <SheetClose asChild>
                  <Link
                    className="mobile-navigation__links__toggle__link-item__link"
                    to="/app/issues"
                  >
                    Issues
                  </Link>
                </SheetClose>
              </div>
            </Toggle>
            <Toggle
              className="mobile-navigation__links__toggle"
              data-state={
                location.pathname === "/app/issues/create-issue" ? "on" : "off"
              }
              asChild
            >
              <div className="mobile-navigation__links__toggle__link-item">
                <SheetClose asChild>
                  <Link
                    className="mobile-navigation__links__toggle__link-item__link"
                    to="/app/issues/create-issue"
                  >
                    Create Issue
                  </Link>
                </SheetClose>
              </div>
            </Toggle>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mobile-navigation__logout">Logout</Button>
            </AlertDialogTrigger>
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
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export { MobileNavigation };
