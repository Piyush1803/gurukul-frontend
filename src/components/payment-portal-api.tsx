// const handlePlaceOrder = async () => {
//   if (!name.trim() || !phoneNo.trim() || !address.trim()) {
//     alert("Please fill in name, phone number, and address to place the order.");
//     return;
//   }
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("Please login to continue to checkout");
//     navigate("/products");
//     return;
//   }

//   const now = new Date();
//   const submittedAt = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now
//       .getMinutes()
//       .toString()
//       .padStart(2, '0')}`;

//   try {
//     setIsPlacingOrder(true);
//     const SHEETY_ENDPOINT = "https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulBakeryOrders/sheet1";
//     const payload = {
//       sheet1: {
//         name,
//         items: items.map((i) => `${i.name} x${i.quantity}`).join(", "),
//         quantity: items.reduce((sum, i) => sum + i.quantity, 0),
//         subTotal: subtotal,
//         phoneNo,
//         address,
//         submittedAt,
//       },
//     };

//     const res = await fetch(SHEETY_ENDPOINT, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       throw new Error(errText || "Failed to post order to Sheety");
//     }

//     clear();
//     navigate("/order-success");
//   } catch (e: any) {
//     console.error(e);
//     alert("Failed to place order: " + e.message);
//   } finally {
//     setIsPlacingOrder(false);
//   }
// };
