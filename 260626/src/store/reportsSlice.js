import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reportsList: [
    { id: 1, title: 'Q2_Ciro_Raporu.pdf', size: '2.4 MB', date: '22.06.2026 16:30', url: '#' },
    { id: 2, title: 'Stok_Sayim_Listesi.xlsx', size: '840 KB', date: '22.06.2026 09:15', url: '#' },
  ],
}

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    generateReport: (state, action) => {
      const { type, range, format } = action.payload // Örn: 'Finansal Ciro Raporu', 'Son 30 Gün', 'PDF'
      
      const fileExt = format === 'Excel (.xlsx)' ? 'xlsx' : 'pdf'
      const titleAbbr = type.split(' ').map(w => w[0]).join('').toUpperCase()
      const rangeClean = range.replace(' ', '_')
      const title = `${titleAbbr}_Raporu_${rangeClean}.${fileExt}`
      
      const sizeNum = (1.2 + Math.random() * 3).toFixed(1)
      const size = `${sizeNum} MB`
      
      const dateStr = new Date().toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      const nextId = state.reportsList.length > 0 ? Math.max(...state.reportsList.map(r => r.id)) + 1 : 1
      state.reportsList.unshift({
        id: nextId,
        title,
        size,
        date: dateStr,
        url: '#',
      })
    },
  },
})

export const { generateReport } = reportsSlice.actions
export default reportsSlice.reducer
