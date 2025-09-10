import React, { useState } from "react";
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
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { items, subtotal, clear } = useCart();
  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = async () => {
    if (!name.trim() || !phoneNo.trim() || !completeAddress.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const now = new Date();
    const submittedAt = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const finalAddress = `${completeAddress}, ${landmark ? landmark + "," : ""} ${city}, ${state} - ${pincode}`;

    try {
      setIsPlacingOrder(true);
      const SHEETY_ENDPOINT =
        "https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulBakeryOrders/sheet1";

      const payload = {
        sheet1: {
          name,
          items: items.map((i) => `${i.name} x${i.quantity}`).join(", "),
          quantity: items.reduce((sum, i) => sum + i.quantity, 0),
          subTotal: subtotal,
          phoneNo,
          address: finalAddress,
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
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-pink-50">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Customer Details */}
        <div className="bg-white p-4 shadow rounded space-y-3">
          <h2 className="text-xl font-bold text-pink-700 mb-4">Delivery Details</h2>

          <div>
            <label className="block text-sm font-semibold mb-1">Full Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Your full name" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number *</label>
            <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="e.g. 9876543210" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Complete Address *</label>
            <textarea value={completeAddress} onChange={(e) => setCompleteAddress(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Flat / House No, Street, Area" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Landmark</label>
            <input value={landmark} onChange={(e) => setLandmark(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Nearby landmark" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">City *</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="City" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">State *</label>
              <input value={state} onChange={(e) => setState(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="State" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">PIN Code *</label>
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="PIN Code" />
          </div>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white p-4 shadow rounded h-fit">
        <h2 className="text-xl font-bold text-pink-700 mb-4">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2 border-b pb-2">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
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
          className={`mt-4 w-full py-3 rounded-lg transition text-white font-semibold flex items-center justify-center ${isPlacingOrder ? "bg-pink-400 cursor-not-allowed opacity-90" : "bg-pink-600 hover:bg-pink-700"
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
