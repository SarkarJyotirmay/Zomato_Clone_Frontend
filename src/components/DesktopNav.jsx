import React from "react";
import { Button } from "./ui/button";
import UserMenu from "./UserMenu"
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const DesktopNav = () => {
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.user)
  return (
    <>
      <span className="flex space-x-2 items-center">
        {user ? (
          <>
          <span className="flex space-x-2 text-lg">
         <Link to="/contact">Contact</Link>
         <Link to="/settings">Settings</Link>
         <Link to="/cart">Cart</Link>
          </span>
          <UserMenu />
          </>
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
