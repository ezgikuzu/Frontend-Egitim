import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Stock from './pages/Stock'
import Products from './pages/Products'
import Reports from './pages/Reports'
import Messaging from './pages/Messaging'
import { useSelector } from 'react-redux'

export default function App() {
  const activeTab= useSelector((state)=> state.auth.activeTab)
  return (
    <div className="app-container">
      <input type="radio" id="tab-login" name="crm-tab" checked={activeTab==="login"} readOnly defaultChecked className="tab-radio" />
      <input type="radio" id="tab-dashboard" name="crm-tab" checked={activeTab==="dashboard"} readOnly className="tab-radio" />
      <input type="radio" id="tab-customers" name="crm-tab" checked={activeTab==="customers"} readOnly className="tab-radio" />
      <input type="radio" id="tab-stock" name="crm-tab" checked={activeTab==="stock"} readOnly className="tab-radio" />
      <input type="radio" id="tab-products" name="crm-tab" checked={activeTab==="products"} readOnly className="tab-radio" />
      <input type="radio" id="tab-reports" name="crm-tab" checked={activeTab==="reports"} readOnly className="tab-radio" />
      <input type="radio" id="tab-messages" name="crm-tab" checked={activeTab==="messages"} readOnly className="tab-radio" />

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

