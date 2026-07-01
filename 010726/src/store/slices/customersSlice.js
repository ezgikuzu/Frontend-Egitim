import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/customers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Müşteriler yüklenirken hata oluştu.');
    }
  }
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/customers`, {
        ...customerData,
        createAt: new Date().toISOString().split('T')[0]
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Müşteri eklenirken hata oluştu.');
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/customers/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Müşteri güncellenirken hata oluştu.');
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/customers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Müşteri silinirken hata oluştu.');
    }
  }
);

// Notes async thunks
export const fetchNotes = createAsyncThunk(
  'customers/fetchNotes',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/notes?customerId=${customerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Notlar yüklenirken hata oluştu.');
    }
  }
);

export const addNote = createAsyncThunk(
  'customers/addNote',
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/notes`, {
        ...noteData,
        date: new Date().toISOString().split('T')[0]
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Not eklenirken hata oluştu.');
    }
  }
);

const initialState = {
  items: [],
  currentCustomer: null,
  notes: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  notesStatus: 'idle',
  error: null
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCurrentCustomer(state, action) {
      state.currentCustomer = action.payload;
    },
    clearCurrentCustomer(state) {
      state.currentCustomer = null;
      state.notes = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Customers
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add Customer
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Customer
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentCustomer && state.currentCustomer.id === action.payload.id) {
          state.currentCustomer = action.payload;
        }
      })
      // Delete Customer
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.currentCustomer && state.currentCustomer.id === action.payload) {
          state.currentCustomer = null;
          state.notes = [];
        }
      })
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.notesStatus = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notesStatus = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.notesStatus = 'failed';
      })
      // Add Note
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      });
  }
});

export const { setCurrentCustomer, clearCurrentCustomer } = customersSlice.actions;
export default customersSlice.reducer;
