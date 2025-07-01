import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearUser } from "../store/slices/userSlice";

const MobileNavLinks = () => {
const dispatch = useDispatch()

     const handleLogOut = () => {
        dispatch(clearUser());
        localStorage.removeItem("token");
        toast.success("Log out successfull");
      };

  return (
    <>
      <span className="w-full flex flex-col text-center items-center justify-between gap-2">
        <Link
          to="/order-status"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          Order Status
        </Link>
        <Link
          to="/manage-restaurant"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          My Restaurant
        </Link>
        <Link
          to="/user-profile"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          User Profile
        </Link>
        <Link
          to="/contact"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          Contact Us
        </Link>
        <Button
          onClick={() => handleLogOut()}
          className="flex w-full  items-center px-3 font-bold hover:bg-gray-500"
        >
          Log Out
        </Button>
      </span>
    </>
  );
};

export default MobileNavLinks;
