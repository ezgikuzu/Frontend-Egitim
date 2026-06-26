import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  addProductAsync, 
  deleteProductAsync, 
  addCategoryAsync, 
  setSelectedCategory,
  editProductAsync,
  setSelectedProduct,
  clearSelectedProduct
} from '../store/productSlice'

function ProductIcon({ type }) {
  if (type === 'desktop') {
    return (
      <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    )
  }
  if (type === 'phone') {
    return (
      <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      </svg>
    )
  }
  if (type === 'mouse') {
    return (
      <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
    )
  }
  return (
    <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
    </svg>
  )
}

export default function Products() {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.products.categories)
  const selectedCategory = useSelector((state) => state.products.selectedCategory)
  const productList = useSelector((state) => state.products.list)
  const selectedProduct = useSelector((state) => state.products.selectedProduct)
  const fetchStatus = useSelector((state) => state.products.status)
  const actionStatus = useSelector((state) => state.products.actionStatus)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('Bilgisayar')
  const [price, setPrice] = useState(15000)
  const [description, setDescription] = useState('')

  const [newCatName, setNewCatName] = useState('')

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name)
      setCategory(selectedProduct.category)
      setPrice(selectedProduct.price)
      setDescription(selectedProduct.description)
    } else {
      setName('')
      setCategory('Bilgisayar')
      setPrice(15000)
      setDescription('')
    }
  }, [selectedProduct])

  const handleProductSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const productData = {
      name,
      category,
      price: parseFloat(price) || 0,
      description
    }

    if (selectedProduct) {
      dispatch(editProductAsync({ id: selectedProduct.id, ...productData }))
    } else {
      dispatch(addProductAsync(productData))
    }

    setName('')
    setCategory('Bilgisayar')
    setPrice(15000)
    setDescription('')
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    dispatch(addCategoryAsync(newCatName.trim()))
    setNewCatName('')
  }

  const getCategoryCount = (cat) => {
    if (cat === 'Hepsi') return productList.length
    return productList.filter(p => p.category === cat).length
  }

  const filteredProducts = selectedCategory === 'Hepsi'
    ? productList
    : productList.filter(p => p.category === selectedCategory)

  return (
    <div className="tab-content products-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Ürün Katalog Yönetimi</h1>
          <p className="page-subtitle">Kategori bazlı ürün listesi, ürün ekleme, düzenleme ve katalog kontrolleri.</p>
        </div>
      </div>

      <div className="category-navbar">
        {categories.map(cat => (
          <button 
            key={cat}
            type="button" 
            onClick={() => dispatch(setSelectedCategory(cat))}
            className={cat === selectedCategory ? 'category-btn-active' : 'category-btn'}
          >
            {cat} ({getCategoryCount(cat)})
          </button>
        ))}
      </div>

      <div className="grid-two-cols">
        <div className="products-grid-column">
          {fetchStatus === 'loading' ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="text-xs">Ürün katalog veritabanı yükleniyor (1000 Ürün)...</p>
            </div>
          ) : (
            <div className="grid-products">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div>
                    <div className="product-image-placeholder">
                      <img 
                        src={`https://picsum.photos/400/250?random=${product.id}`} 
                        alt={product.name} 
                        className="product-image" 
                        loading="lazy"
                      />
                    </div>
                    <div className="product-header-row">
                      <span className="product-category-tag">{product.category}</span>
                      <span className="font-semibold text-slate-900">₺{product.price.toLocaleString('tr-TR')}</span>
                    </div>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                  </div>
                  <div className="product-actions">
                    <button 
                      type="button" 
                      onClick={() => dispatch(setSelectedProduct(product))}
                      className="btn-product-edit"
                    >
                      Düzenle
                    </button>
                    <button 
                      type="button" 
                      onClick={() => dispatch(deleteProductAsync(product.id))}
                      className="btn-product-delete"
                    >
                      Katalogdan Kaldır
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className="empty-message">Bu kategoride kayıtlı ürün bulunmamaktadır.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex-container">
          <div className="card-container">
            <div className="card-title">
              <span>{selectedProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</span>
              {selectedProduct && (
                <button 
                  type="button" 
                  onClick={() => dispatch(clearSelectedProduct())}
                  className="btn-cancel-edit"
                >
                  Vazgeç
                </button>
              )}
            </div>
            <form onSubmit={handleProductSubmit}>
              <div className="form-group">
                <label className="form-label">Ürün Adı</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Örn: Macbook Pro 16"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select 
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.filter(c => c !== 'Hepsi').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Satış Fiyatı (TL)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="0.00" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ürün Açıklaması</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Ürün özellikleri ve detaylı açıklaması..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Görsel Seçimi (Tasarım)</label>
                <div className="image-upload-dashed">
                  <span className="upload-text">Görsel yüklemek için sürükleyin veya tıklayın</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={actionStatus === 'loading'}
                className="btn-submit"
              >
                {actionStatus === 'loading' ? 'Kaydediliyor...' : (selectedProduct ? 'Ürünü Güncelle' : 'Kataloga Ekle')}
              </button>
            </form>
          </div>

          <div className="card-container">
            <div className="card-title">
              <span>Kategori Yönetimi</span>
              <span className="card-subtitle-link">+ Ekle</span>
            </div>
            <form onSubmit={handleCategorySubmit}>
              <div className="form-group">
                <label className="form-label">Kategori Adı</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Örn: Network Cihazları" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kategori Kodu (Ön Ek)</label>
                <input type="text" className="form-input" placeholder="Örn: NET" />
              </div>
              <button 
                type="submit" 
                disabled={actionStatus === 'loading'}
                className="btn-category-submit"
              >
                {actionStatus === 'loading' ? 'Oluşturuluyor...' : 'Kategori Oluştur'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
