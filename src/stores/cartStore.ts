import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  image: string;
  pricePerM2: number;
  color: string;
  colorCode: string;
  thickness: string;
  size: string;
  area: number;
  quantity: number;
  totalPrice: number;
}

interface CartStore {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      totalAmount: 0,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      addToCart: (newItem) => {
        set((state) => {
          // Check if item with same configuration already exists
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.productId === newItem.productId &&
              item.color === newItem.color &&
              item.thickness === newItem.thickness &&
              item.size === newItem.size
          );

          let updatedItems: CartItem[];

          if (existingItemIndex > -1) {
            // Update quantity and total price
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity:
                updatedItems[existingItemIndex].quantity + newItem.quantity,
              totalPrice:
                updatedItems[existingItemIndex].totalPrice + newItem.totalPrice,
            };
          } else {
            // Add new item
            updatedItems = [...state.items, newItem];
          }

          const itemCount = updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const totalAmount = updatedItems.reduce(
            (total, item) => total + item.totalPrice,
            0
          );

          return {
            items: updatedItems,
            itemCount,
            totalAmount,
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const itemCount = updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const totalAmount = updatedItems.reduce(
            (total, item) => total + item.totalPrice,
            0
          );

          return {
            items: updatedItems,
            itemCount,
            totalAmount,
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id === id) {
              const totalPrice = item.pricePerM2 * item.area * quantity;
              return { ...item, quantity, totalPrice };
            }
            return item;
          });

          const itemCount = updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const totalAmount = updatedItems.reduce(
            (total, item) => total + item.totalPrice,
            0
          );

          return {
            items: updatedItems,
            itemCount,
            totalAmount,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          totalAmount: 0,
        });
      },
    }),
    {
      name: "cart-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
