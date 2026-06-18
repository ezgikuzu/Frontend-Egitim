export default function CategoriesList({
  categories,
  products,
  onCategoryClick,
}) {
  const categoriesWithCount = categories
    .filter((c) => c !== "Tümü")
    .map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }));
  return (
    <>
      <main className="container">
        <div className="container-header">
          <h1 className="page-title">Tüm Kategoriler</h1>
        </div>
        <div className="categories-grid">
          {categoriesWithCount.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={onCategoryClick(cat.name)}
            >
              <div className="category-icon-box">
                <span>{cat.name.substring(0,1)}</span>
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <span className="category-count">{cat.count} Ürün</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
