import { createSlice } from "@reduxjs/toolkit";

export const initialCustomerForm = {
  email: "",
  password: "",
  age: "",
  gender: "",
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
      state.customers = state.customers.filter(
        (customer) => customer.id !== payload
      );
    },
    updateCustomer: (state, { payload }) => {
      state.customers = state.customers.map((customer) => {
        if (customer.id === payload.id) {
          return {
            ...customer,
            name: payload.customer.name,
            gender: payload.customer.gender,
            age: payload.customer.age,
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

export const { addCustomer, removeCustomer, updateCustomer, loadingCustomers } =
  customerSlice.actions;
