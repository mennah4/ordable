import { createSlice } from "@reduxjs/toolkit"
import { MERCHANT_STORE_NAME } from "../../../redux/constants";

interface merchantState {
  store: any,
  merchant: {},
  orders: any[],
  products: any[],
  lastOrder: any,
  hasMore: boolean,
  status: string,
  error: Error | undefined
}

const initialState: merchantState = {
  store: {},
  merchant: {},
  orders: [],
  products: [],
  lastOrder: null,
  hasMore: true,
  status: 'idle',
  error: undefined
}

export const slice = createSlice({
  name: MERCHANT_STORE_NAME,
  initialState,
  reducers: {
    getMerchantInfo: (state, action) => {
      state.merchant = action.payload;
    },
    getStoreInfo: (state, action) => {
      state.store = action.payload;
    },
    getStoreProducts: (state, action) => {
      state.products = action.payload;
    },
    getStoreOrders: (state, action) => {
      state.orders = action.payload;
    },
    deleteProdut: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      state.products[index] = action.payload;
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex((order) => order.id === action.payload.id);
      state.orders[index] = action.payload;
    },
    createProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    }
  },
});

export const actions = slice.actions
export const reducer = slice.reducer
