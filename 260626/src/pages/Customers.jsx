import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  addCustomerAsync, 
  editCustomerAsync, 
  deleteCustomerAsync, 
  selectCustomerForEdit, 
  clearSelectedCustomer 
} from '../store/customerSlice'

export default function Customers() {
  const dispatch = useDispatch()
  const customerList = useSelector((state) => state.customers.list)
  const selectedCustomer = useSelector((state) => state.customers.selectedCustomer)
  const fetchStatus = useSelector((state) => state.customers.status)
  const actionStatus = useSelector((state) => state.customers.actionStatus)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('Aktif')

  const [customerToDelete, setCustomerToDelete] = useState(null)

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

  const filteredCustomers = customerList.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRows = filteredCustomers.length
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + rowsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID', 'Ad Soyad', 'Firma', 'E-posta', 'Telefon', 'Bakiye', 'Durum']
    const rows = filteredCustomers.map(c => [
      c.id,
      c.name,
      c.company,
      c.email,
      c.phone,
      c.balance,
      c.status
    ])
    const csvString = [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `musteriler_raporu_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name)
      setCompany(selectedCustomer.company)
      setEmail(selectedCustomer.email)
      setPhone(selectedCustomer.phone)
      setStatus(selectedCustomer.status)
    } else {
      resetForm()
    }
  }, [selectedCustomer])

  const resetForm = () => {
    setName('')
    setCompany('')
    setEmail('')
    setPhone('')
    setStatus('Aktif')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const customerData = { name, company, email, phone, status }

    if (selectedCustomer) {
      dispatch(editCustomerAsync({ id: selectedCustomer.id, ...customerData }))
    } else {
      dispatch(addCustomerAsync(customerData))
    }
    resetForm()
  }

  const handleCancelEdit = () => {
    dispatch(clearSelectedCustomer())
  }

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      dispatch(deleteCustomerAsync(customerToDelete.id))
      setCustomerToDelete(null)
    }
  }

  return (
    <div className="tab-content customers-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Müşteri Yönetimi</h1>
          <p className="page-subtitle">Müşteri listesi, ekleme, düzenleme ve silme panelleri.</p>
        </div>
      </div>

      <div className="grid-two-cols">
        {/* Customer List */}
        <div className="card-container col-span-two">
          <div className="card-title">
            <span>Kayıtlı Müşteriler</span>
            <span className="badge-info">Toplam {customerList.length} Müşteri</span>
          </div>

          {fetchStatus === 'loading' ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="text-xs">Müşteri veritabanı yükleniyor (1000 Müşteri)...</p>
            </div>
          ) : (
            <>
              <div className="table-toolbar">
                <input 
                  type="text" 
                  placeholder="Müşteri ara..." 
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
                      <th className="table-header-cell">Müşteri Bilgisi</th>
                      <th className="table-header-cell">İletişim</th>
                      <th className="table-header-cell">Bakiye</th>
                      <th className="table-header-cell">Durum</th>
                      <th className="table-header-cell text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((c) => (
                      <tr key={c.id} className="table-row">
                        <td className="table-cell">
                          <div>
                            <p className="font-semibold">{c.name}</p>
                            <p className="subtext">{c.company}</p>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div>
                            <p className="text-xs">{c.email}</p>
                            <p className="subtext">{c.phone}</p>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className={c.balance < 0 ? "cell-value-debt" : "cell-value"}>
                            {c.balance < 0 ? '-' : ''}₺{Math.abs(c.balance).toLocaleString('tr-TR')}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span className={
                            c.status === 'Aktif' ? 'badge-success' : 
                            c.status === 'Riskli' ? 'badge-warning' : 'badge-danger'
                          }>
                            {c.status}
                          </span>
                        </td>
                        <td className="table-cell text-right">
                          <div className="cell-actions">
                            <button 
                              type="button" 
                              onClick={() => dispatch(selectCustomerForEdit(c))} 
                              className="btn-table-action"
                            >
                              Düzenle
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setCustomerToDelete(c)} 
                              className="btn-table-action-danger"
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <tr className="table-row">
                        <td colSpan="5" className="subtext text-center">
                          Arama sonucu eşleşen müşteri bulunmamaktadır.
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

        {/* Form Panel */}
        <div className="flex-container">
          <div className="card-container">
            <div className="card-title">
              <span>{selectedCustomer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}</span>
              {selectedCustomer && (
                <button type="button" onClick={handleCancelEdit} className="btn-cancel-edit">
                  Vazgeç
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Ad Soyad / Firma Yetkilisi</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Ahmet Yılmaz" 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Firma Ünvanı</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  placeholder="Yılmaz Mühendislik A.Ş." 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">E-posta Adresi</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="ahmet@firma.com" 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Telefon Numarası</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+90 532 000 0000" 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Müşteri Durumu</label>
                <select 
                  className="form-select" 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Pasif">Pasif</option>
                  <option value="Riskli">Riskli</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={actionStatus === 'loading'} 
                className="btn-submit"
              >
                {actionStatus === 'loading' ? 'Kaydediliyor...' : (selectedCustomer ? 'Değişiklikleri Kaydet' : 'Müşteriyi Kaydet')}
              </button>
            </form>
          </div>

          {/* Delete Dialog */}
          {customerToDelete && (
            <div className="card-alert-container">
              <div className="card-title text-rose-800">
                <span>Müşteri Silme Onayı</span>
                <span className="text-rose-500 font-bold">⚠</span>
              </div>
              <p className="alert-text">
                <strong>{customerToDelete.name}</strong> isimli müşteriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>
              <div className="flex-actions">
                <button 
                  type="button" 
                  disabled={actionStatus === 'loading'} 
                  onClick={handleConfirmDelete} 
                  className="btn-danger flex-1"
                >
                  {actionStatus === 'loading' ? 'Siliniyor...' : 'Evet, Sil'}
                </button>
                <button type="button" onClick={() => setCustomerToDelete(null)} className="btn-secondary flex-1">Vazgeç</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
