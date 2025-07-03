import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import { Button } from "../components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetRestaurantById } from "../api/MyRestaurantApi";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { restaurantId, restaurantName, items, isLoading } = useSelector(
    (state) => state.cart
  );

  const { user, userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
    
    console.log(userProfile);
    
  }, [user, userProfile]);

  // ✅ Fetch deliveryPrice from restaurant API
  const { restaurant, isPending: isRestaurantLoading } =
    useGetRestaurantById(restaurantId);

  const deliveryPrice = restaurant?.restaurant?.deliveryPrice || 0;

  const handleQuantityChange = (menuItemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ menuItemId, quantity }));
  };

  const handleRemove = (menuItemId) => {
    dispatch(removeFromCart(menuItemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(()=>{
    console.log(isLoading, isRestaurantLoading);
    
    console.log(items);
    
  }, [items])

  const cartTotal = cartSubtotal + deliveryPrice * 100; // delivery price is in rupees, convert to paise

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {isLoading  ? (
        <p className="text-gray-600 animate-pulse">Loading cart...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-orange-600">
              Restaurant: {restaurantName}
            </h3>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.menuItemId}
                className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-white"
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{(item.price / 100).toFixed(2)} x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(item.menuItemId, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(item.menuItemId, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleRemove(item.menuItemId)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-right">
            <p className="text-gray-700">
              Subtotal: ₹{(cartSubtotal / 100).toFixed(2)}
            </p>
            <p className="text-gray-700">
              Delivery: ₹{deliveryPrice.toFixed(2)}
            </p>
            <p className="text-xl font-semibold">
              Total: ₹{(cartTotal / 100).toFixed(2)}
            </p>

            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button onClick={() => navigate("/checkout")}>Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
