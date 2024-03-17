import { createSlice } from "@reduxjs/toolkit"
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";

interface CustomerState {
  orders: any[],
  cart: any,
  selectedProduct: any,
  customer: any,
  hasMore: boolean,
  status: string,
  error: Error | undefined
}

const initialState: CustomerState = {
  orders: [],
  cart: null,
  selectedProduct: null,
  customer: localStorage.getItem('customerInfo') ? JSON.parse(localStorage.getItem('customerInfo') ?? '') : null,
  hasMore: true,
  status: 'idle',
  error: undefined
}

export const slice = createSlice({
  name: CUSTOMER_STORE_NAME,
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
      localStorage.setItem('customerInfo', JSON.stringify(action.payload));
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    getCustomerOrders: (state, action) => {
      state.orders = action.payload;
    },
    getCustomerCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const actions = slice.actions
export const reducer = slice.reducer

