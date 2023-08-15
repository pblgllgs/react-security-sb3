import { createSlice } from "@reduxjs/toolkit";

export const initialCustomerForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
  admin: false,
};

export const initialErrors = {
  username: "",
  password: "",
  email: "",
};

export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
  },
  reducers: {
    addCustomer: (state, { payload }) => {
      state.customers = [
        ...state.customers,
        {
          ...payload,
        },
      ];
    },
    removeCustomer: (state, { payload }) => {
      state.customers = state.customers.filter((customer) => customer.id !== payload);
    },
    updateUser: (state, { payload }) => {
      state.customers = state.customers.map((customer) => {
        if (customer.id === payload.id) {
          return {
            ...payload,
          };
        }
        return customer;
      });
    },
    loadingCustomers: (state, { payload }) => {
      state.customers = payload;
    },
  },
});

export const {
  addCustomer,
  removeCustomer,
  updateCustomer,
  loadingCustomers
} = customerSlice.actions;
