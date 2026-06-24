import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      company: "Yılmaz Mühendislik A.Ş.",
      email: "ahmet@yilmaz.com",
      phone: "05335333333",
      balance: 12500,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Mehmet Yılmaz",
      company: "Yılmaz Mühendislik A.Ş.",
      email: "mehmet@yilmaz.com",
      phone: "05335333333",
      balance: 4500,
      status: "Pasif",
    },
    {
      id: 3,
      name: "Selami Yılmaz",
      company: "Yılmaz Mühendislik A.Ş.",
      email: "selami@yilmaz.com",
      phone: "05335333333",
      balance: 1200,
      status: "Aktif",
    },
    {
      id: 4,
      name: "Esra Yılmaz",
      company: "Yılmaz Mühendislik A.Ş.",
      email: "esra@yilmaz.com",
      phone: "05335333333",
      balance: -5000,
      status: "Pasif",
    },
  ],
  selecterCustomer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: (state, action) => {
    addCustomer: (state, action) => {
      const nextId =
        state.list.length > 0
          ? Math.max(...state.list.map((c) => c.id)) + 1
          : 1;
      state.list.push({
        id: nextId,
        balance: 0,
        ...action.payload,
      });
    };
    editCustomer: (state, action) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
      state.selecterCustomer = null;
    };
    deleteCustomer: (state, action) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    };
    selectCustomerForEdit: (state, action) => {
      state.selecterCustomer = action.payload;
    };
    clearSelectedCustomer: (state) => {
      state.selecterCustomer = null;
    };
  },
});
export const {
  addCustomer,
  editCustomer,
  deleteCustomer,
  selectCustomerForEdit,
  clearSelectedCustomer,
} = customerSlice.actions;
export default customerSlice.reducer;
