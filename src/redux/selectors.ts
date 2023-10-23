import {Cart} from './slices/CartSlice';
import {RootState} from './store';

const {createSelector} = require('@reduxjs/toolkit');

const cartSelector = (state: RootState) => state.cart.cartList;

export const cartTotalPriceSelector = createSelector(
  [cartSelector],
  (cart: Cart[]) =>
    cart.reduce(
      (total, current) =>
        (total += (current.price || 0) * (current.quantity || 1)),
      0,
    ),
);
