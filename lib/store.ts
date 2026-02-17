import { create } from 'zustand';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from './api';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

interface CartStore {
  items: CartItem[];
  total: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const data = await getCart();
      set({ items: data.items, total: data.total, loading: false });
    } catch (error) {
      console.error('Error fetching cart:', error);
      set({ loading: false });
    }
  },

  addToCart: async (productId: number, quantity: number) => {
    try {
      await apiAddToCart(productId, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateQuantity: async (itemId: number, quantity: number) => {
    try {
      await updateCartItem(itemId, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  removeItem: async (itemId: number) => {
    try {
      await apiRemoveFromCart(itemId);
      await get().fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
}));
