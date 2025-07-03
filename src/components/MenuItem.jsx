import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IndianRupee, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

const MenuItem = ({ menuItem, restaurantId }) => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.cart);

  // Check if item already in cart
  const cartItem = items.find(
    (item) => item.menuItemId === menuItem._id
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ restaurantId, menuItemId: menuItem._id }))
      .unwrap()
      .then(() => toast.success("Added to cart"))
      .catch((err) => toast.error(err || "Could not add item"));
  };

  const handleIncreaseQty = () => {
    dispatch(
      updateCartQuantity({
        menuItemId: menuItem._id,
        quantity: cartItem.quantity + 1,
      })
    )
      .unwrap()
      .catch(() => toast.error("Could not update cart"));
  };

  const handleDecreaseQty = () => {
    if (cartItem.quantity === 1) {
      dispatch(removeFromCart(menuItem._id))
        .unwrap()
        .catch(() => toast.error("Could not remove item"));
    } else {
      dispatch(
        updateCartQuantity({
          menuItemId: menuItem._id,
          quantity: cartItem.quantity - 1,
        })
      )
        .unwrap()
        .catch(() => toast.error("Could not update cart"));
    }
  };

  return (
    <Card className="bg-white hover:shadow transition p-2">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">{menuItem.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center pt-2">
        <div className="font-semibold flex items-center gap-1 text-gray-700">
          <IndianRupee className="w-4 h-4" />
          {(menuItem.price / 100).toFixed(2)}
        </div>

        {/* Add / Quantity Controls */}
        {cartItem ? (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleDecreaseQty}
              variant="outline"
              className="text-red-600"
              disabled={isLoading}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-medium w-4 text-center">
              {cartItem.quantity}
            </span>
            <Button
              size="sm"
              onClick={handleIncreaseQty}
              variant="outline"
              className="text-green-600"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            size="sm"
            disabled={isLoading}
            variant="outline"
            className="text-green-600 hover:bg-green-100"
          >
            Add
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
