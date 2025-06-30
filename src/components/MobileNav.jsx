import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false); // 👈 sheet open state

  const handleLoginClick = () => {
    setOpen(false);             // ✅ close sheet first
    navigate("/login");         // ✅ then redirect
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="p-2">
        <SheetTitle>
          {user ? (
            <span className="flex gap-2 items-center font-semibold">
              <CircleUserRound className="text-orange-500" />
              {user?.firstName}
            </span>
          ) : (
            <span>Welcome to EatZy</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex">
          {user ? (
            <MobileNavLinks />
          ) : (
            <Button
              className="flex-1 font-bold bg-orange-500"
              onClick={handleLoginClick} // ✅ handle both close + redirect
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
