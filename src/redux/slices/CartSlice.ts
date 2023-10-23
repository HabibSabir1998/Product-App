import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Cart {
  id: string;
  img: string;
  quantity?: number;
  name: string;
  price: number;
}

interface CartState {
  cartList: Cart[];
}

const initialState: CartState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      const itemInCart = state.cartList.find(
        item => item.id === action.payload.id,
      );
      if (itemInCart) {
        itemInCart.quantity = (itemInCart.quantity ?? 0) + 1;
      } else {
        state.cartList.push({...action.payload, quantity: 1});
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartList.find(value => value.id === action.payload);
      if (item) {
        item.quantity = (item.quantity ?? 0) + 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartList.find(value => value.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity = Math.max((item.quantity ?? 0) - 1, 1);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeItem = state.cartList.filter(
        item => item.id !== action.payload,
      );
      state.cartList = removeItem;
    },
    clear: () => {
      return initialState;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clear,
} = cartSlice.actions;
