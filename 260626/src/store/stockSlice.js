import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addProductAsync } from './productSlice'

// Async Thunks
export const fetchStock = createAsyncThunk(
  'stock/fetchStock',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db.json')
      if (!response.ok) throw new Error('Stok verileri yüklenemedi.')
      const data = await response.json()
      return data.stock
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const incrementStockAsync = createAsyncThunk(
  'stock/incrementStockAsync',
  async (itemId, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return itemId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const decrementStockAsync = createAsyncThunk(
  'stock/decrementStockAsync',
  async (itemId, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return itemId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addStockMovementAsync = createAsyncThunk(
  'stock/addStockMovementAsync',
  async (movementData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return {
        ...movementData,
        date: new Date().toLocaleDateString('tr-TR')
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  items: [],
  movements: [
    { id: 1, sku: 'SKU-849-APL', type: 'Giriş', quantity: 45, date: '22.06.2026', note: 'İlk devir sevkiyatı' },
    { id: 2, sku: 'SKU-102-LOG', type: 'Giriş', quantity: 10, date: '22.06.2026', note: 'Mal kabul' },
  ],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actionStatus: 'idle',
}

const getStatus = (quantity) => {
  if (quantity === 0) return 'Tükendi'
  if (quantity <= 10) return 'Kritik Sınır'
  return 'Stokta Var'
}

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchStock.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStock.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchStock.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Increment
      .addCase(incrementStockAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(incrementStockAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const item = state.items.find(i => i.id === action.payload)
        if (item) {
          item.quantity += 1
          item.status = getStatus(item.quantity)
        }
      })
      .addCase(incrementStockAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Decrement
      .addCase(decrementStockAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(decrementStockAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const item = state.items.find(i => i.id === action.payload)
        if (item && item.quantity > 0) {
          item.quantity -= 1
          item.status = getStatus(item.quantity)
        }
      })
      .addCase(decrementStockAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Movement
      .addCase(addStockMovementAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addStockMovementAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const { sku, type, quantity, note, date } = action.payload
        const item = state.items.find(i => i.sku === sku)
        const qtyNum = parseInt(quantity, 10) || 0

        if (item) {
          if (type === 'Giriş') {
            item.quantity += qtyNum
          } else if (type === 'Çıkış') {
            item.quantity = Math.max(0, item.quantity - qtyNum)
          }
          item.status = getStatus(item.quantity)

          const nextId = state.movements.length > 0 ? Math.max(...state.movements.map(m => m.id)) + 1 : 1
          state.movements.unshift({
            id: nextId,
            sku,
            type,
            quantity: qtyNum,
            date,
            note: note || 'Stok Hareketi',
          })
        }
      })
      .addCase(addStockMovementAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Extra listener for products/addProductAsync.fulfilled
      .addCase(addProductAsync.fulfilled, (state, action) => {
        const { sku, name, category } = action.payload
        const nextId = state.items.length > 0 ? Math.max(...state.items.map(i => i.id)) + 1 : 1
        state.items.push({
          id: nextId,
          sku,
          name,
          category,
          quantity: 0,
          location: 'Depo-A • Raf Tanımsız',
          status: 'Tükendi',
        })
      })
  },
})

export default stockSlice.reducer
