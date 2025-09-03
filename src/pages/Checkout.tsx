import React, { useState, useMemo } from "react";
import { useCart } from "@/hooks/use-cart";
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
  // Payment method removed per requirement
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { items, subtotal, clear } = useCart();

  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = async () => {
    if (!name.trim() || !phoneNo.trim() || !address.trim()) {
      alert("Please fill in name, phone number, and address to place the order.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue to checkout");
      navigate("/products");
      return;
    }

    const now = new Date();
    const submittedAt = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    try {
      setIsPlacingOrder(true);
      const SHEETY_ENDPOINT = "https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulBakeryOrders/sheet1";
      const payload = {
        sheet1: {
          name,
          items: items.map((i) => `${i.name} x${i.quantity}`).join(", "),
          quantity: items.reduce((sum, i) => sum + i.quantity, 0),
          subTotal: subtotal,
          phoneNo,
          address,
          submittedAt,
        },
      };

      const res = await fetch(SHEETY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to post order to Sheety");
      }

      clear();
      navigate("/order-success");
    } catch (e: any) {
      console.error(e);
      alert("Failed to place order: " + e.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) return <p className="p-6">Your cart is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Customer Details */}
        <div className="bg-white p-4 shadow rounded space-y-3">
          <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g. 9876543210" />
          </div>
          <div>
            <label className="block text-sm mb-1">Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Flat, Street, Area, City, PIN" />
          </div>
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
          disabled={isPlacingOrder}
          aria-busy={isPlacingOrder}
          className={`mt-4 w-full py-2 rounded transition text-white flex items-center justify-center ${isPlacingOrder ? "bg-green-500 cursor-not-allowed opacity-90" : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {isPlacingOrder ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Placing order...
            </span>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
