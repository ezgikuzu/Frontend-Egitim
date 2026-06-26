import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessageAsync, setActiveContact } from '../store/messageSlice'

export default function Messaging() {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.messaging.contacts)
  const activeContactId = useSelector((state) => state.messaging.activeContactId)
  const threads = useSelector((state) => state.messaging.threads)
  const fetchStatus = useSelector((state) => state.messaging.status)
  const actionStatus = useSelector((state) => state.messaging.actionStatus)

  const [searchTerm, setSearchTerm] = useState('')
  const [inputText, setInputText] = useState('')
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const activeContact = contacts.find((c) => c.id === activeContactId)
  const activeThread = threads[activeContactId] || []

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    dispatch(sendMessageAsync(inputText.trim()))
    setInputText('')
  }

  const handleAttach = () => {
    showToast('Dosya eki yükleme özelliği tasarım aşamasındadır.')
  }

  const handleOptions = () => {
    showToast('Sohbet seçenekleri menüsü')
  }

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getLastMessage = (contactId) => {
    const thread = threads[contactId]
    if (thread && thread.length > 0) {
      const lastMsg = thread[thread.length - 1]
      return lastMsg.content
    }
    return 'Mesaj bulunmuyor'
  }

  const getLastMessageTime = (contactId) => {
    const thread = threads[contactId]
    if (thread && thread.length > 0) {
      const lastMsg = thread[thread.length - 1]
      return lastMsg.time
    }
    return ''
  }

  return (
    <div className="tab-content messages-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Sistem İçi Mesajlaşma</h1>
          <p className="page-subtitle">Departmanlar ve teknik personel arası anlık koordinasyon.</p>
        </div>
      </div>

      <div className="chat-container">
        {fetchStatus === 'loading' ? (
          <div className="loading-container chat-loading">
            <div className="spinner"></div>
            <p className="text-xs">Mesajlaşma verileri yükleniyor...</p>
          </div>
        ) : (
          <>
            <div className="contact-sidebar">
              <div className="contact-search">
                <input 
                  type="text" 
                  placeholder="Personel ara..." 
                  className="form-input w-full" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="contact-list">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    onClick={() => dispatch(setActiveContact(contact.id))}
                    className={`contact-item ${contact.id === activeContactId ? 'contact-item-active' : ''}`}
                  >
                    <div className={`avatar-wrapper ${contact.bgClass}`}>
                      <span>{contact.initials}</span>
                      <span className={contact.active ? 'status-dot-active' : 'status-dot-offline'}></span>
                    </div>
                    <div className="flex-1">
                      <div className="contact-meta-row">
                        <h4 className="contact-name">{contact.name}</h4>
                        <span className="text-[9px] text-slate-400">{getLastMessageTime(contact.id)}</span>
                      </div>
                      <p className="contact-preview">{getLastMessage(contact.id)}</p>
                    </div>
                  </div>
                ))}
                {filteredContacts.length === 0 && (
                  <p className="subtext p-4">Aramayla eşleşen personel bulunamadı.</p>
                )}
              </div>
            </div>

            {activeContact ? (
              <div className="message-area">
                <div className="chat-header">
                  <div className="chat-user-row">
                    <div className={`avatar-wrapper ${activeContact.bgClass}`}>
                      <span>{activeContact.initials}</span>
                    </div>
                    <div>
                      <h4 className="contact-name">{activeContact.name}</h4>
                      <span className="active-status-bar">
                        <span className="active-status-dot"></span>
                        {activeContact.active ? 'Anlık Aktif' : 'Çevrimdışı'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button type="button" onClick={handleOptions} className="icon-btn">
                      <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="chat-thread">
                  {activeThread.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={msg.sender === 'me' ? 'bubble-sent' : 'bubble-received'}
                    >
                      <p>{msg.content}</p>
                      <span className="chat-time">
                        {msg.time} {msg.sender === 'me' && '✓✓'}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSend} className="chat-input-bar">
                  <button type="button" disabled={actionStatus === 'loading'} onClick={handleAttach} className="icon-btn">
                    📎
                  </button>
                  <input 
                    type="text" 
                    placeholder={actionStatus === 'loading' ? 'Gönderiliyor...' : 'Mesajınızı yazın...'} 
                    className="form-input flex-1" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    required
                    disabled={actionStatus === 'loading'}
                  />
                  <button type="submit" disabled={actionStatus === 'loading'} className="btn-primary">
                    {actionStatus === 'loading' ? '...' : 'Gönder'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="message-area chat-empty-state">
                <p className="text-slate-400 text-sm">Sohbete başlamak için soldan bir kişi seçin.</p>
              </div>
            )}
          </>
        )}
      </div>
      {toast && <div className="toast-notification">{toast}</div>}
    </div>
  )
}
