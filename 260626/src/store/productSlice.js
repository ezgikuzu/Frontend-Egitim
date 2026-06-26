import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db.json')
      if (!response.ok) throw new Error('Ürün verileri yüklenemedi.')
      const data = await response.json()
      return data.products
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addProductAsync = createAsyncThunk(
  'products/addProductAsync',
  async (productData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      
      const categoryAbbr = (productData.category || 'GEN').substring(0, 3).toUpperCase()
      const randomNum = Math.floor(100 + Math.random() * 900)
      const sku = `SKU-${randomNum}-${categoryAbbr}`
      
      let iconType = 'box'
      if (productData.category === 'Bilgisayar') iconType = 'desktop'
      else if (productData.category === 'Telefon') iconType = 'phone'
      else if (productData.category === 'Aksesuar') iconType = 'mouse'

      return {
        id: Date.now(),
        sku,
        iconType,
        ...productData,
        price: parseFloat(productData.price) || 0
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editProductAsync = createAsyncThunk(
  'products/editProductAsync',
  async (productData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return productData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProductAsync',
  async (productId, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return productId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addCategoryAsync = createAsyncThunk(
  'products/addCategoryAsync',
  async (catName, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return catName
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  categories: ['Hepsi', 'Bilgisayar', 'Telefon', 'Aksesuar', 'Yazıcı', 'Yazılım Lisansları'],
  selectedCategory: 'Hepsi',
  selectedProduct: null,
  list: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actionStatus: 'idle',
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add
      .addCase(addProductAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list.push(action.payload)
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Edit
      .addCase(editProductAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const index = state.list.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          let iconType = 'box'
          if (action.payload.category === 'Bilgisayar') iconType = 'desktop'
          else if (action.payload.category === 'Telefon') iconType = 'phone'
          else if (action.payload.category === 'Aksesuar') iconType = 'mouse'

          state.list[index] = { 
            ...state.list[index], 
            ...action.payload, 
            iconType,
            price: parseFloat(action.payload.price) || 0 
          }
        }
        state.selectedProduct = null
      })
      .addCase(editProductAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Delete
      .addCase(deleteProductAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list = state.list.filter(p => p.id !== action.payload)
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Add Category
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        if (!state.categories.includes(action.payload)) {
          state.categories.push(action.payload)
        }
      })
  }
})

export const { 
  setSelectedCategory,
  setSelectedProduct,
  clearSelectedProduct
} = productSlice.actions
export default productSlice.reducer
