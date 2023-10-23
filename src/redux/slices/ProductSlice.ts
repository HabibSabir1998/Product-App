import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {PRODUCT_FETCH_URL} from '../../utils/constants';

export interface Product {
  id: string;
  img: string;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
  fetchError: string;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  fetchError: '',
  isLoading: true,
};

export const fetchProducts: any = createAsyncThunk(
  'feed/fetch-product',
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${PRODUCT_FETCH_URL}/products`);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue('Failed to fetch');
    }
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    intializeProducts: state => {
      state.products = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.fetchError = '';
    });
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.fetchError = action.payload as string;
      state.products = [];
      state.isLoading = false;
    });
  },
});

export const {intializeProducts} = productSlice.actions;
export const productReducer = productSlice.reducer;
