export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
}) {
  if (!isOpen) return null;
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <>
      <div>
        <div className="drawer-overlay" onClick={onClose}></div>
        <div className="drawer">
          <div className="drawer-header">
            <h2 className="drawer-title">Sepetim</h2>
            <span className="drawer-close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="drawer-body">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500">Sepetiniz Boş</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img-box">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-img"
                    />
                  </div>
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <span className="cart-item-price">
                      {item.price.toLocaleString("tr-TR")} TL
                    </span>
                    <div className="cart-item-qty">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, +1)}
                      >
                        +
                      </button>
                    </div>
                    <span
                      className="cart-item-remove"
                      onClick={() => onRemove(item.id)}
                    >
                      Kaldır
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="drawer-footer">
            <div className="cart-summary-row">
              <span>Ara Toplam</span>
              <span>{total.toLocaleString("tr-TR")} TL</span>
            </div>
            <div className="cart-summary-row">
              <span>Kargo</span>
              <span>Bedava</span>
            </div>
            <div className="cart-summary-row">
              <span className="font-bold">Toplam</span>
              <span className="cart-summary-total">
                {total.toLocaleString("tr-TR")} TL
              </span>
            </div>
            <button className="cart-checkout-btn">Alışverişi Tamamla</button>
          </div>
        </div>
      </div>
    </>
  );
}
