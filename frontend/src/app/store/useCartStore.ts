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

interface Alert {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

interface CartState {
  cart: CartItem[];
  alerts: Alert[];
  setCart: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  addAlert: (alert: Omit<Alert, "id">) => void;
  removeAlert: (id: number) => void;
  totalItems: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  alerts: [],

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

  addAlert: (alert) => {
    const id = Date.now();
    set((state) => ({
      alerts: [...state.alerts, { id, ...alert }],
    }));

    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((a) => a.id !== id),
      }));
    }, 3000);
  },

  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  get totalItems() {
    return get().cart.reduce((acc, item) => acc + item.quantity, 0);
  },
}));
