
const API_BASE = "/cart";

export const getCartItems = async (userId: string, token: string) => {
  const res = await fetch(`http://localhost:3001/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const contentType = res.headers.get("Content-Type");

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Failed to fetch cart items: " + errorText);
  }

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    throw new Error("Response is not JSON");
  }
};
export const fetchCartItems = async () => {
  const token = localStorage.getItem("token"); // or useContext/auth state
  const res = await fetch("/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
};

export const addToCart = async (productId: string, token: string) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error("Failed to add to cart");

  return res.json();
};

export const updateCartItem = async (
  cartItemId: string,
  quantity: number,
  token: string
) => {
  const res = await fetch(`${API_BASE}/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) throw new Error("Failed to update cart item");

  return res.json();
};

export const removeCartItem = async (cartItemId: string, token: string) => {
  const res = await fetch(`${API_BASE}/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to remove item from cart");

  return true;
};
