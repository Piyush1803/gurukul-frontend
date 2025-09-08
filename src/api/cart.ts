const API_BASE = "http://localhost:3001/cart";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found in localStorage");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getCartItems = async (): Promise<RawCartItem[]> => {
  const res = await fetch(`${API_BASE}/userCart`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Failed to fetch cart items: " + errorText);
  }
  return res.json();
};

export const fetchCartItems = async () => {
  const res = await fetch(`${API_BASE}/userCart`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error(`Failed to fetch cart: ${res.statusText}`);
  return res.json();
};

export const addToCart = async (productId: number, quantity: number) => {
  const res = await fetch(`${API_BASE}/addToCart`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  const res = await fetch(`${API_BASE}/${cartItemId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
};

export const removeCartItem = async (cartItemId: number) => {
  const res = await fetch(`${API_BASE}/${cartItemId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to remove item from cart");
  return true;
};
