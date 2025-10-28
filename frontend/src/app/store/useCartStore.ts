import { create } from "zustand";

interface CartItem {
  id: number;
  quantity: number;
  sticker: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

interface CartState {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  totalItems: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  setCart: (items) => set({ cart: items }),
  addItem: (item) => {
    const existing = get().cart.find((i) => i.id === item.id);
    if (existing) {
      set({
        cart: get().cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...get().cart, item] });
    }
  },
  removeItem: (itemId) =>
    set({ cart: get().cart.filter((item) => item.id !== itemId) }),
  clearCart: () => set({ cart: [] }),
  get totalItems() {
    return get().cart.reduce((acc, item) => acc + item.quantity, 0);
  },


  alerts: [],
  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { id: Date.now(), ...alert }],
    })),

  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  setCart: (newCart) => set({ cart: newCart }),
}));
