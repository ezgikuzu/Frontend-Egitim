import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunks
export const fetchMessages = createAsyncThunk(
  'messaging/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db.json')
      if (!response.ok) throw new Error('Mesaj verileri yüklenemedi.')
      const data = await response.json()
      return {
        contacts: data.contacts,
        threads: data.threads
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sendMessageAsync = createAsyncThunk(
  'messaging/sendMessageAsync',
  async (messageText, { getState, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 350))
      const state = getState()
      const activeId = state.messaging.activeContactId
      const timeStr = new Date().toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      })
      return {
        contactId: activeId,
        message: {
          id: Date.now(),
          sender: 'me',
          content: messageText,
          time: timeStr
        }
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  contacts: [],
  activeContactId: 'AY',
  threads: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actionStatus: 'idle',
}

const messageSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setActiveContact: (state, action) => {
      state.activeContactId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.contacts = action.payload.contacts
        state.threads = action.payload.threads
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Send message
      .addCase(sendMessageAsync.pending, (state) => {
        state.actionStatus = 'loading'
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.actionStatus = 'succeeded'
        const { contactId, message } = action.payload
        if (!state.threads[contactId]) {
          state.threads[contactId] = []
        }
        state.threads[contactId].push(message)
      })
      .addCase(sendMessageAsync.rejected, (state) => {
        state.actionStatus = 'failed'
      })
  }
})

export const { setActiveContact } = messageSlice.actions
export default messageSlice.reducer
