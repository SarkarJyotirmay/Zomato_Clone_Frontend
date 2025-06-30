import React from "react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const DesktopNav = () => {
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.user)
  return (
    <>
      <span className="flex space-x-2 items-center">
        {user ? (
          <UserMenu />
        ) : (
          <Button
            variant="ghost"
            className="bg-gray-900 text-white hover:bg-orange-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        )}
      </span>
    </>
  );
};

export default DesktopNav;
