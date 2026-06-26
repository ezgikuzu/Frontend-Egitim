import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchStock, 
  incrementStockAsync, 
  decrementStockAsync, 
  addStockMovementAsync 
} from '../store/stockSlice'

export default function Stock() {
  const dispatch = useDispatch()
  const stockItems = useSelector((state) => state.stock.items)
  const movements = useSelector((state) => state.stock.movements)
  const fetchStatus = useSelector((state) => state.stock.status)
  const actionStatus = useSelector((state) => state.stock.actionStatus)

  const [selectedSku, setSelectedSku] = useState('')
  const [movementType, setMovementType] = useState('Giriş')
  const [quantity, setQuantity] = useState(5)
  const [note, setNote] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const filteredStock = stockItems.filter(item =>
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRows = filteredStock.length
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedStock = filteredStock.slice(startIndex, startIndex + rowsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleExportCSV = () => {
    const headers = ['SKU', 'Ürün Adı', 'Kategori', 'Miktar', 'Konum', 'Durum']
    const rows = filteredStock.map(item => [
      item.sku,
      item.name,
      item.category,
      item.quantity,
      item.location,
      item.status
    ])
    const csvString = [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `stok_raporu_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (stockItems.length > 0 && !selectedSku) {
      setSelectedSku(stockItems[0].sku)
    }
  }, [stockItems, selectedSku])

  const qtyDepoA = stockItems.filter(i => i.location && i.location.includes('Depo-A')).reduce((sum, i) => sum + i.quantity, 0)
  const qtyDepoB = stockItems.filter(i => i.location && i.location.includes('Depo-B')).reduce((sum, i) => sum + i.quantity, 0)
  
  const capacityA = Math.min(100, Math.round((qtyDepoA / 1000) * 100))
  const capacityB = Math.min(100, Math.round((qtyDepoB / 300) * 100))

  const handleMovementSubmit = (e) => {
    e.preventDefault()
    if (!selectedSku || quantity <= 0) return

    dispatch(addStockMovementAsync({
      sku: selectedSku,
      type: movementType,
      quantity,
      note
    }))

    setQuantity(5)
    setNote('')
  }

  return (
    <div className="tab-content stock-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stok Yönetimi</h1>
          <p className="page-subtitle">Ürün stok miktarları, hareket giriş/çıkışları ve uyarı limitleri.</p>
        </div>
      </div>

      <div className="grid-two-cols">
        {/* Stock List */}
        <div className="card-container col-span-two">
          <div className="card-title">
            <span>Stok Durum Tablosu</span>
            <span className="badge-warning">
              {stockItems.filter(i => i.quantity <= 10).length} Kritik Sınır
            </span>
          </div>

          {fetchStatus === 'loading' ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="text-xs">Stok veritabanı yükleniyor (1000 Stok kalemi)...</p>
            </div>
          ) : (
            <>
              <div className="table-toolbar">
                <input 
                  type="text" 
                  placeholder="Stok kodu veya ürün ara..." 
                  className="form-input table-search" 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button type="button" onClick={handleExportCSV} className="btn-secondary">
                  Dışa Aktar (CSV)
                </button>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-header-cell">SKU / Kod</th>
                      <th className="table-header-cell">Ürün Adı</th>
                      <th className="table-header-cell">Kategori</th>
                      <th className="table-header-cell">Miktar</th>
                      <th className="table-header-cell">Durum</th>
                      <th className="table-header-cell text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStock.map((item) => (
                      <tr key={item.id} className="table-row">
                        <td className="table-cell">
                          <span className="sku-code">{item.sku}</span>
                        </td>
                        <td className="table-cell">
                          <div>
                            <p className="font-semibold text-slate-900">{item.name}</p>
                            <p className="subtext">{item.location}</p>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="category-tag">{item.category}</span>
                        </td>
                        <td className="table-cell">
                          <div className="stock-level-container">
                            <span className="font-semibold text-slate-900">{item.quantity} Adet</span>
                            <div className="stock-bar-wrapper">
                              <div className={`stock-bar-fill ${
                                item.quantity === 0 ? 'stock-bar-fill-danger' :
                                item.quantity <= 10 ? 'stock-bar-fill-warning' : 'stock-bar-fill-success'
                              }`} style={{ width: `${Math.min(100, (item.quantity / 120) * 100)}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className={
                            item.quantity === 0 ? 'badge-danger' : 
                            item.quantity <= 10 ? 'badge-warning' : 'badge-success'
                          }>
                            {item.status}
                          </span>
                        </td>
                        <td className="table-cell text-right">
                          <div className="cell-actions">
                            <button 
                              type="button" 
                              disabled={actionStatus === 'loading'}
                              onClick={() => dispatch(incrementStockAsync(item.id))} 
                              className="btn-stock-action"
                            >
                              +
                            </button>
                            <button 
                              type="button" 
                              disabled={actionStatus === 'loading'}
                              onClick={() => dispatch(decrementStockAsync(item.id))} 
                              className="btn-stock-action"
                            >
                              -
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredStock.length === 0 && (
                      <tr className="table-row">
                        <td colSpan="6" className="subtext text-center">
                          Arama sonucu eşleşen stok kalemi bulunmamaktadır.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pagination-footer">
                <div className="pagination-info">
                  {totalRows > 0 ? (
                    <span>
                      {startIndex + 1} - {Math.min(startIndex + rowsPerPage, totalRows)} / {totalRows} kayıt gösteriliyor
                    </span>
                  ) : (
                    <span>Kayıt bulunamadı</span>
                  )}
                </div>

                <div className="pagination-controls">
                  <div className="pagination-select-wrapper">
                    <span>Satır:</span>
                    <select 
                      className="pagination-select" 
                      value={rowsPerPage} 
                      onChange={handleRowsPerPageChange}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>

                  <div className="pagination-btn-group">
                    <button 
                      type="button" 
                      disabled={currentPage === 1} 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      className="pagination-btn"
                    >
                      Önceki
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum = currentPage
                      if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                      
                      if (pageNum < 1 || pageNum > totalPages) return null
                      
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={pageNum === currentPage ? 'pagination-btn-active' : 'pagination-btn'}
                        >
                          {pageNum}
                        </button>
                      )
                    })}

                    <button 
                      type="button" 
                      disabled={currentPage === totalPages} 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      className="pagination-btn"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Stock Control Panels */}
        <div className="flex-container">
          {/* Stock In/Out adjustment */}
          <div className="card-container">
            <div className="card-title">
              <span>Hızlı Stok Hareketi Girişi</span>
              <span className="text-xs text-emerald-600 font-semibold">Giriş / Çıkış</span>
            </div>
            <form onSubmit={handleMovementSubmit}>
              <div className="form-group">
                <label className="form-label">Ürün Seçin</label>
                <select 
                  className="form-select" 
                  value={selectedSku} 
                  onChange={(e) => setSelectedSku(e.target.value)}
                >
                  {stockItems.map(item => (
                    <option key={item.id} value={item.sku}>
                      {item.name} ({item.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Hareket Tipi</label>
                <div className="movement-selector">
                  <label className="movement-label">
                    <input 
                      type="radio" 
                      name="movement-type" 
                      checked={movementType === 'Giriş'} 
                      onChange={() => setMovementType('Giriş')} 
                      className="text-indigo-600" 
                    />
                    Stok Ekle (+)
                  </label>
                  <label className="movement-label">
                    <input 
                      type="radio" 
                      name="movement-type" 
                      checked={movementType === 'Çıkış'} 
                      onChange={() => setMovementType('Çıkış')} 
                      className="text-indigo-600" 
                    />
                    Stok Çıkar (-)
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Miktar (Adet)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))} 
                  placeholder="5" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Açıklama / Fiş No</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)} 
                  placeholder="Örn: Yeni sevkiyat girişi" 
                />
              </div>

              <button 
                type="submit" 
                disabled={actionStatus === 'loading'}
                className="btn-submit"
              >
                {actionStatus === 'loading' ? 'Kaydediliyor...' : 'Hareketi Kaydet'}
              </button>
            </form>
          </div>

          {/* Warehouse status mockup */}
          <div className="card-container">
            <div className="card-title">
              <span>Depo Dağılımı</span>
              <span className="card-subtitle">Kapasite Doluluk</span>
            </div>
            <div className="flex-container">
              <div>
                <div className="warehouse-label-row">
                  <span>Merkez Depo (Depo-A)</span>
                  <span>{capacityA}% Dolu</span>
                </div>
                <div className="capacity-bar-wrapper">
                  <div className="capacity-bar-fill capacity-bar-fill-primary" style={{ width: `${capacityA}%` }}></div>
                </div>
              </div>

              <div>
                <div className="warehouse-label-row">
                  <span>Yedek Depo (Depo-B)</span>
                  <span>{capacityB}% Dolu</span>
                </div>
                <div className="capacity-bar-wrapper">
                  <div className="capacity-bar-fill capacity-bar-fill-secondary" style={{ width: `${capacityB}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
