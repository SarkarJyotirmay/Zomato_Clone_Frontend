import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../store/slices/cartSlice";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, restaurantName, isLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { address = {}, firstName = "", email = "" } = user || {};

  const [formAddress, setFormAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (address) {
      setFormAddress(address);
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAddress((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = items.length > 0 ? 5000 : 0; // hardcoded fallback
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    try {
      await axiosInstance.post("/order/place", { address: formAddress });
      toast.success("Order placed successfully");
      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.response?.data?.message || "Could not place order");
    }
  };

  if (isLoading) return <p className="text-center py-8">Loading cart...</p>;
  if (!user) return <p className="text-center py-8 text-red-600">User not logged in.</p>;
  if (items.length === 0)
    return <p className="text-center py-8 text-gray-500">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Delivery Address Form */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <p className="text-sm text-gray-600">Prefilled from your profile. You can edit it here.</p>

          {[
            { name: "addressLine1", label: "Address Line 1" },
            { name: "addressLine2", label: "Address Line 2" },
            { name: "landmark", label: "Landmark" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "pincode", label: "Pincode" },
          ].map(({ name, label }) => (
            <div key={name}>
              <Label>{label}</Label>
              <Input
                name={name}
                value={formAddress[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cart Summary */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <p className="text-orange-600 font-medium">Restaurant: {restaurantName}</p>

          {items.map((item) => (
            <div
              key={item.menuItemId}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.name} x {item.quantity}</span>
              <span>₹{((item.price * item.quantity) / 100).toFixed(2)}</span>
            </div>
          ))}

          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>₹{(subtotal / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Delivery</span>
            <span>₹{(deliveryCharge / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
};

export default CheckoutPage;
