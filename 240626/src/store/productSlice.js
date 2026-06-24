import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    "Hepsi",
    "Bilgisayar",
    "Telefon",
    "Aksesuar",
    "Yazıcı",
    "Yazılım Lisanslari",
  ],
  selectedCategory: "Hepsi",
  selectedProduct: null,
  list: [
    {
      id: 1,
      name: 'Macbook Pro 14" M3',
      sku: "SKU-849-APL",
      category: "Bilgisayar",
      price: 54999,
      description: "Apple M3 Çip, 8C CPU, 10C GPU, 8GB RAM, 512GB SSD",
      iconType: "desktop",
    },
    {
      id: 2,
      name: "iPhone 15 128GB",
      sku: "SKU-990-APL",
      category: "Telefon",
      price: 42500,
      description:
        "A16 Bionic işlemci, 48MP ana kamera, USB-C girişi, Siyah renk",
      iconType: "phone",
    },
    {
      id: 3,
      name: "Logitech MX Master 3S",
      sku: "SKU-102-LOG",
      category: "Aksesuar",
      price: 2499,
      description:
        "Kablosuz ergonomik fare, 8K DPI optik sensör, USB-C şarj edilebilir",
      iconType: "mouse",
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: (product) => {
        const categoryAbbr = (product.category || "GEN")
          .substring(0, 3)
          .toUpperCase();
        const randomNum = Math.floor(100 + Math.random() * 900);
        const sku = `SKU-${randomNum}-${categoryAbbr}`;
        let iconType = "box";
        if (product.category === "Bilgisayar") iconType = "desktop";
        else if (product.category === "Telefon") iconType = "phone";
        else if (product.category === "Aksesuar") iconType = "mouse";
        return {
          payload: {
            id: Date.now(),
            sku,
            iconType,
            ...product,
            price: parseFloat(product.price) || 0,
          },
        };
      },
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    editProduct: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        let iconType = "box";
        if (action.payload.category === "Bilgisayar") iconType = "desktop";
        else if (action.payload.category === "Telefon") iconType = "phone";
        else if (action.payload.category === "Aksesuar") iconType = "mouse";
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
          iconType,
          price: parseFloat(action.payload.price) || 0,
        };
      }
      state.selectedProduct = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  addCategory,
  setSelectedCategory,
  editProduct,
  setSelectedProduct,
  clearSelectedProduct,
} = productSlice.actions;
export default productSlice.reducer;
