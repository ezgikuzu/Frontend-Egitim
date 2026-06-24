import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: 1, sku: 'SKU-849-APL', name: 'Macbook Pro 14" M3', category: 'Bilgisayar', quantity: 45, location: 'Depo-A • Raf B3', status: 'Stokta Var' },
    { id: 2, sku: 'SKU-102-LOG', name: 'Logitech MX Master 3S', category: 'Aksesuar', quantity: 8, location: 'Depo-A • Raf C1', status: 'Kritik Sınır' },
    { id: 3, sku: 'SKU-773-DEL', name: 'Dell UltraSharp 27"', category: 'Monitör', quantity: 0, location: 'Depo-B • Raf A2', status: 'Tükendi' },
    { id: 4, sku: 'SKU-520-HPG', name: 'HP LaserJet Pro M404n', category: 'Yazıcı', quantity: 18, location: 'Depo-A • Raf B10', status: 'Stokta Var' },
  ],
  movements: [
    { id: 1, sku: 'SKU-849-APL', type: 'Giriş', quantity: 45, date: '22.06.2026', note: 'İlk devir sevkiyatı' },
    { id: 2, sku: 'SKU-102-LOG', type: 'Giriş', quantity: 10, date: '22.06.2026', note: 'Mal kabul' },
  ],
  capacity: {
    depoA: 78,
    depoB: 35,
  },
}

const getStatus = (quantity) => {
  if (quantity === 0) return 'Tükendi'
  if (quantity <= 10) return 'Kritik Sınır'
  return 'Stokta Var'
}

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    incrementStock: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) {
        item.quantity += 1
        item.status = getStatus(item.quantity)
      }
    },
    decrementStock: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.quantity > 0) {
        item.quantity -= 1
        item.status = getStatus(item.quantity)
      }
    },
    addStockMovement: (state, action) => {
      const { sku, type, quantity, note } = action.payload // type: 'Giriş' veya 'Çıkış'
      const item = state.items.find(i => i.sku === sku)
      const qtyNum = parseInt(quantity, 10) || 0

      if (item) {
        if (type === 'Giriş') {
          item.quantity += qtyNum
        } else if (type === 'Çıkış') {
          item.quantity = Math.max(0, item.quantity - qtyNum)
        }
        item.status = getStatus(item.quantity)

        const todayStr = new Date().toLocaleDateString('tr-TR')
        const nextId = state.movements.length > 0 ? Math.max(...state.movements.map(m => m.id)) + 1 : 1
        state.movements.unshift({
          id: nextId,
          sku,
          type,
          quantity: qtyNum,
          date: todayStr,
          note: note || 'Stok Hareketi',
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase('products/addProduct', (state, action) => {
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

export const { incrementStock, decrementStock, addStockMovement } = stockSlice.actions
export default stockSlice.reducer
