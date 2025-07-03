import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog } from "./ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import CheckoutProfileForm from "../forms/CheckoutProfileForm";

const CheckOutButton = ({ disabled }) => {
  const { user, loading, userProfile } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate(); // ✅ Call it as a function

  useEffect(() => {
    console.log("User:", user);
    console.log("UserProfile:", userProfile);
  }, [user, userProfile]);

  const onLogin = () => {
    navigate("/login");
  };

  //   !
  //   const onCheckout = (onCheckout, formData) => {
  //     console.log("Checkout data:", formData);
  //     // TODO: send formData to backend or store in redux
  //     alert("Checkout successful! 🎉");
  //   };

  if (!user) {
    return (
      <Button className="bg-orange-500 flex-1" onClick={onLogin}>
        Log in to check out
      </Button>
    );
  }

  if (loading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 flex-1">Go to checkout</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 max-h-[90vh] overflow-y-auto">
        <CheckoutProfileForm />
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutButton;
