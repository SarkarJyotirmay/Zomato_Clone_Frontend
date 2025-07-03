import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../utils/loadRazorpay";
import { toast } from "react-toastify";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const CheckoutPage = () => {
  const { items, restaurantName, restaurantId, isLoading } = useSelector((state) => state.cart);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) setFormAddress(address);
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAddress((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 5000; // ₹50 in paise
  const totalAmount = subtotal + deliveryCharge;

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Failed to load Razorpay. Try again.");
      return;
    }

    try {
      // 1. Create Razorpay order
      const res = await axiosInstance.post("/payment/create", {
        totalAmount,
      });

      const { order } = res.data;

      // 2. Show Razorpay modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Eatzy",
        description: "Food Order Payment",
        order_id: order.id,
        prefill: {
          name: firstName,
          email: email,
        },
        theme: { color: "#f97316" },
        handler: async function (response) {
          try {
            const placeOrderRes = await axiosInstance.post("/order/place", {
              address: formAddress,
              paymentInfo: {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
              },
            });

            toast.success("Order placed successfully!");
            dispatch(clearCart());
            navigate("/orders");
          } catch (err) {
            console.error(err);
            toast.error("Payment succeeded, but order failed!");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to start payment");
    }
  };

  if (isLoading) return <p className="text-center py-8">Loading cart...</p>;
  if (!user) return <p className="text-center py-8 text-red-600">User not logged in.</p>;
  if (items.length === 0)
    return <p className="text-center py-8 text-gray-500">Your cart is empty.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Address Form */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Delivery Address</h3>
          <p className="text-sm text-gray-600">Prefilled from your profile. You can edit it here.</p>

          {["addressLine1", "addressLine2", "landmark", "city", "state", "pincode"].map((field) => (
            <div key={field}>
              <Label>{field}</Label>
              <Input name={field} value={formAddress[field]} onChange={handleChange} required />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Summary */}
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
            <span>₹{(totalAmount / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handlePayment}>
        Pay & Place Order
      </Button>
    </div>
  );
};

export default CheckoutPage;
