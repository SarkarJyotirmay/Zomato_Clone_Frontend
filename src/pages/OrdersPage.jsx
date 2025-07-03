import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Card, CardContent } from "../components/ui/card";
import { IndianRupee } from "lucide-react";
import { format } from "date-fns";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/order/my-orders")
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.error("Fetch orders error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-8">Loading orders...</p>;

  if (!orders.length)
    return <p className="text-center py-8 text-gray-500">You have no past orders.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-2xl font-bold">My Orders</h2>

      {orders.map((order) => (
        <Card key={order._id}>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-orange-600">
              {order.restaurantName}
            </h3>
            <p className="text-sm text-gray-500">
              Ordered on {format(new Date(order.createdAt), "dd MMM yyyy, h:mm a")}
            </p>

            <ul className="text-gray-800 text-sm space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="text-sm text-gray-600 pt-2">
              <p>
                <strong>Address:</strong>{" "}
                {order.address.addressLine1}, {order.address.addressLine2},{" "}
                {order.address.landmark}, {order.address.city},{" "}
                {order.address.state} - {order.address.pincode}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                <IndianRupee className="inline w-4 h-4 mb-1" />
                {(order.totalAmount / 100).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersPage;
