import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CartItem, CartContextValue } from '../interfaces/cart.interfaces';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('carrito');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const addToCart: CartContextValue['addToCart'] = (producto, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.producto.id === producto.id);
      if (existing) {
        return prev.map(item =>
          item.producto.id === producto.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { producto, quantity }];
    });
  };

  const removeFromCart: CartContextValue['removeFromCart'] = (id) => {
    setItems(prev => prev.filter(item => item.producto.id !== id));
  };

  const updateQuantity: CartContextValue['updateQuantity'] = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.producto.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart: CartContextValue['clearCart'] = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.producto.precio,
    0
  );

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return ctx;
};
