import React from "react";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUserRound, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";

import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/slices/userSlice";
import { toast } from "react-toastify";

const UsernameMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const notify = () => toast("Log out Successful");

  const handleLogOut = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    notify();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-100 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
        <CircleUserRound className="text-orange-500" />
        {user?.firstName}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-2 min-w-[200px]">
        <DropdownMenuLabel className="text-slate-300 font-medium px-2 py-1">
          Menu
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-t border-slate-600" />

        <DropdownMenuItem asChild>
          <Link
            to="/manage-restaurant"
            className="block px-3 py-2 text-slate-100 rounded hover:bg-orange-500 hover:text-white transition z-50"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/user-profile"
            className="block px-3 py-2 text-slate-100 rounded hover:bg-orange-500 hover:text-white transition"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
{/*  */}
        <DropdownMenuItem asChild>
          <Link
            to="/contact"
            className="block px-3 py-2 text-slate-100 rounded hover:bg-orange-500 hover:text-white transition"
          >
            Contact us
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/order-status"
            className="block px-3 py-2 text-slate-100 rounded hover:bg-orange-500 hover:text-white transition"
          >
            Order status
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 border-t border-slate-600" />

        <DropdownMenuItem asChild>
          <Button
            onClick={() => handleLogOut()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded transition font-semibold"
          >
            <LogOut size={16} />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
