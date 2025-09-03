import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalQuantity: number;
    subtotal: number;
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "gurukul_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? (JSON.parse(raw) as CartItem[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity: number = 1) => {
        setItems((prev) => {
            const index = prev.findIndex((p) => p.id === item.id);
            if (index >= 0) {
                const copy = [...prev];
                copy[index] = { ...copy[index], quantity: copy[index].quantity + quantity };
                return copy;
            }
            return [...prev, { ...item, quantity }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        setItems((prev) => {
            if (quantity <= 0) return prev.filter((p) => p.id !== id);
            return prev.map((p) => (p.id === id ? { ...p, quantity } : p));
        });
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const totalQuantity = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items]
    );
    const subtotal = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );

    const value: CartContextValue = useMemo(
        () => ({ items, totalQuantity, subtotal, addItem, removeItem, updateQuantity, clear }),
        [items, totalQuantity, subtotal, addItem, removeItem, updateQuantity, clear]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}


