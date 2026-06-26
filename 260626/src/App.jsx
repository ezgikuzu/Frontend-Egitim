import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Stock from './pages/Stock'
import Products from './pages/Products'
import Reports from './pages/Reports'
import Messaging from './pages/Messaging'
import { fetchCustomers } from './store/customerSlice'
import { fetchProducts } from './store/productSlice'
import { fetchStock } from './store/stockSlice'
import { fetchMessages } from './store/messageSlice'

export default function App() {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.auth.activeTab)

  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(fetchProducts())
    dispatch(fetchStock())
    dispatch(fetchMessages())
  }, [dispatch])

  return (
    <div className="app-container">
      <input type="radio" id="tab-login" name="crm-tab" checked={activeTab === 'login'} readOnly className="tab-radio" />
      <input type="radio" id="tab-dashboard" name="crm-tab" checked={activeTab === 'dashboard'} readOnly className="tab-radio" />
      <input type="radio" id="tab-customers" name="crm-tab" checked={activeTab === 'customers'} readOnly className="tab-radio" />
      <input type="radio" id="tab-stock" name="crm-tab" checked={activeTab === 'stock'} readOnly className="tab-radio" />
      <input type="radio" id="tab-products" name="crm-tab" checked={activeTab === 'products'} readOnly className="tab-radio" />
      <input type="radio" id="tab-reports" name="crm-tab" checked={activeTab === 'reports'} readOnly className="tab-radio" />
      <input type="radio" id="tab-messages" name="crm-tab" checked={activeTab === 'messages'} readOnly className="tab-radio" />

      <main className="login-screen">
        <Auth />
      </main>

      <div className="app-frame">
        <Sidebar />
        
        <div className="main-content">
          <Header />
          
          <Dashboard />
          <Customers />
          <Stock />
          <Products />
          <Reports />
          <Messaging />
        </div>
      </div>
    </div>
  )
}
