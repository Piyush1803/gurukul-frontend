import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/api/cart";
import { useNavigate } from "react-router-dom";

interface FlattenedCartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const DELIVERY_FEE = 50;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const {
    data: rawItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  const items: FlattenedCartItem[] = useMemo(() => {
    return rawItems.map((item: any) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.imageUrl,
      quantity: item.quantity,
    }));
  }, [rawItems]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    console.log({
      address: "123 Example Street, Your City",
      paymentMethod,
      items,
      total,
    });

    alert("Order placed successfully!");
    navigate("/order-success");
  };

  if (isLoading) return <p className="p-6">Loading checkout details...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load cart</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Address Section */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
          <p>123 Example Street</p>
          <p>Your City, PIN 123456</p>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Online Payment
          </label>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white p-4 shadow rounded h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-2 border-b pb-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>
                {item.name} × {item.quantity}
              </span>
            </div>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-medium mt-4">
          <span>Delivery Fee</span>
          <span>₹{DELIVERY_FEE}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
