import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { enqueueSnackbar } from "notistack";

const initialState: State = {
  cart: [],
};

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
}

interface State {
  cart: Product[];
}

interface Action {
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const storeAPI: StateCreator<State & Action, [["zustand/devtools", never]]> = (
  set,
  get
) => ({
  ...initialState,
  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
    enqueueSnackbar("Producto agregado al carrito", { variant: "success" });
  },

  removeFromCart: (id: string) => {
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
    enqueueSnackbar("Producto eliminado del carrito", { variant: "info" });
  },
  clearCart: () => {
    set({ cart: [] });
    enqueueSnackbar("Carrito vaciado", { variant: "warning" });
  },
});

//para ver como funciona
export const useShoppeKart = create<State & Action>()(
  devtools(
    persist(immer(storeAPI), {
      name: "dataKart",
      storage: createJSONStorage(() => localStorage),
    })
  )
);
