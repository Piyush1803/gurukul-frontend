import React, { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "@/components/bakery/SectionHeader";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LazyImage } from "@/components/motion/LazyImage";
import { Reveal } from "@/components/motion/Reveal";

const DELIVERY_FEE = 50;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
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
    const submittedAt = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

    try {
      setIsPlacingOrder(true);
      const res = await fetch(
        "https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulBakeryOrders/sheet1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheet1: {
              name,
              items: items.map((i) => `${i.name} x${i.quantity}`).join(", "),
              quantity: items.reduce((sum, i) => sum + i.quantity, 0),
              subTotal: subtotal,
              phoneNo,
              address,
              submittedAt,
            },
          }),
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to post order");
      }

      clear();
      navigate("/order-success");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert("Failed to place order: " + message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <p className="text-lg text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-16 section-padding">
      <div className="container-bakery max-w-6xl">
        <SectionHeader
          eyebrow="Checkout"
          title="Complete Your Order"
          description="We'll confirm your order and arrange delivery."
          align="left"
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Reveal className="lg:col-span-2">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-xl font-semibold">Delivery Details</h2>
              <div className="space-y-2">
                <Label htmlFor="checkout-name">Name</Label>
                <Input
                  id="checkout-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="rounded-xl bg-background/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-phone">Phone</Label>
                <Input
                  id="checkout-phone"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="rounded-xl bg-background/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-address">Address</Label>
                <Textarea
                  id="checkout-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat, Street, Area, City, PIN"
                  className="rounded-xl bg-background/60 resize-none min-h-[100px]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-panel rounded-3xl p-6 sm:p-8 h-fit sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center border-b border-border/50 pb-3">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      wrapperClassName="w-14 h-14 rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <span className="font-semibold shrink-0">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm mt-6 text-muted-foreground">
                <span>Delivery</span>
                <span>₹{DELIVERY_FEE}</span>
              </div>
              <div className="flex justify-between text-xl font-display font-bold mt-2">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>

              <MagneticButton className="w-full mt-6">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? "Placing order..." : "Place Order"}
                </Button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
