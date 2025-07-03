import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../store/slices/cartSlice";
import { IndianRupee, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const CartItemCard = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      updateCartQuantity({
        menuItemId: cartItem.menuItemId,
        quantity: cartItem.quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    if (cartItem.quantity > 1) {
      dispatch(
        updateCartQuantity({
          menuItemId: cartItem.menuItemId,
          quantity: cartItem.quantity - 1,
        })
      );
    } else {
      dispatch(removeFromCart(cartItem.menuItemId));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(cartItem.menuItemId));
  };

  return (
    <div className="flex justify-between items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
      {/* Left: Name + Price */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {cartItem.name}
        </h3>
        <div className="text-sm flex items-center text-gray-600">
          <IndianRupee className="w-4 h-4" />
          {(cartItem.price / 100).toFixed(2)}
        </div>
      </div>

      {/* Center: Quantity Control */}
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={handleDecrease}>
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium">{cartItem.quantity}</span>
        <Button size="icon" variant="outline" onClick={handleIncrease}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Right: Remove button */}
      <Button size="icon" variant="destructive" onClick={handleRemove}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CartItemCard;
