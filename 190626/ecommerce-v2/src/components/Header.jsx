import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {useTheme} from "../hooks/useTheme";

export default function Header({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  setSelectedCategory,
  setSearchQuery,
  setView,
  onLoginClick,
  onCartClick,
  cartCount,
}) {
  const handleLogoClick = () => {
    setView("home");
    setSelectedCategory("Tümü");
    setSearchQuery("");
    setSearchInput("");
  };
  const {user, logout}=useContext(UserContext);
  const {theme,toggleTheme}=useTheme()
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={handleLogoClick}>
            n11<span className="logo-accent">Clone</span>
          </div>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Ürün,Kategori veya Marka Ara..."
              className="search-input"
              onChange={(e)=>setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit" className="search-button">Ara</button>
          </form>
          <div className="header-actions">
            <div className="header-items" onClick={toggleTheme}>
              <span>{theme === 'light'?'🌙':'☀️'}</span>
            </div>
            <div className="action-item" onClick={()=>setView('addProduct')}>
              <span>Yeni Ürün</span>
            </div>

            {user ? (
              <div className="action-item" onClick={logout}>
                <span>Çıkış Yap</span>
              </div>
            ) : ( 
            <div className="action-item" onClick={onLoginClick}>
              <span>Giriş Yap</span>
            </div>
            )}
            <div className="action-item" onClick={onCartClick}>
              <span>Sepetim</span>
              <span className="badge">{cartCount}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
