import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunks
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db.json')
      if (!response.ok) throw new Error('Müşteri verileri yüklenemedi.')
      const data = await response.json()
      return data.customers
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addCustomerAsync = createAsyncThunk(
  'customers/addCustomerAsync',
  async (customerData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return {
        id: Date.now(),
        balance: 0,
        ...customerData
      }
    } catch (error) {
      return rejectWithValue(error.message) 
    }
  }
)

export const editCustomerAsync = createAsyncThunk(
  'customers/editCustomerAsync',
  async (customerData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return customerData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteCustomerAsync = createAsyncThunk(
  'customers/deleteCustomerAsync',
  async (customerId, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return customerId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  list: [],
  selectedCustomer: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
}

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    selectCustomerForEdit: (state, action) => {
      state.selectedCustomer = action.payload
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Add
      .addCase(addCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(addCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list.unshift(action.payload)
      })
      .addCase(addCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Edit
      .addCase(editCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(editCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const index = state.list.findIndex(c => c.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload }
        }
        state.selectedCustomer = null
      })
      .addCase(editCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
      // Delete
      .addCase(deleteCustomerAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        state.list = state.list.filter(c => c.id !== action.payload)
      })
      .addCase(deleteCustomerAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

export const { selectCustomerForEdit, clearSelectedCustomer } = customerSlice.actions
export default customerSlice.reducer
