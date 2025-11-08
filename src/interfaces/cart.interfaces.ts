import type { ProductoProps } from './productos.interfaces';

export interface CartItem {
  producto: ProductoProps;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  addToCart: (producto: ProductoProps, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
