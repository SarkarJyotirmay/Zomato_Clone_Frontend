import React from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { IndianRupee, Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { current } from "@reduxjs/toolkit";

const OrderSummary = ({ restaurant, cartItems, removeFromCart }) => {
  const getTotalCost = () => {
    const totalInPaisa = cartItems.reduce(
      (prev, curr) => prev + Number(curr.price) * Number(curr.quantity),
      0
    );

    const totalWithDelivery = (totalInPaisa / 100) + Number(restaurant.deliveryPrice);

    return totalWithDelivery.toFixed(2)
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span className="flex gap-2 items-center">
            <IndianRupee className="w-4 h-4" /> {getTotalCost()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>

            <span className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />{" "}
              {(Number(item.price) * Number(item.quantity) / 100).toFixed(2)}
              <Trash className="cursor-pointer" color="red" size={20} onClick={()=>removeFromCart(item)}/>
            </span>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="flex gap-2 items-center">
            <IndianRupee className="w-4 h-4" />{" "}
            {restaurant.deliveryPrice.toFixed(2)}
          </span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
