import { create } from "zustand";

interface StoreState {
  cart: any[];
  alerts: { type: "success" | "error" | "info"; message: string; id: number }[];

  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;

  addAlert: (type: "success" | "error" | "info", message: string) => void;
  removeAlert: (id: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  alerts: [],

  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  addAlert: (type, message) => {
    const id = Date.now();
    set((state) => ({
      alerts: [...state.alerts, { type, message, id }],
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
}));
