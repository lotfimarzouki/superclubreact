import React, { useState, useEffect } from "react";

function ProductList({
  products,
  addToPanierlist,
  showProductDetails,
  addToWishlist,
}) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [colorFilter, setColorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    let filtered = products;
    // Filtrer par couleur
    if (colorFilter) {
      filtered = filtered.filter((product) =>
        product.color.name.toLowerCase().includes(colorFilter.toLowerCase())
      );
    }

    // Filtrer par catégorie
    if (categoryFilter) {
      filtered = filtered.filter((product) =>
        product.category.name
          .toLowerCase()
          .includes(categoryFilter.toLowerCase())
      );
    }

    // Filtrer par prix
    if (priceFilter) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(priceFilter)
      );
    }
    setFilteredProducts(filtered);
  }, [colorFilter, categoryFilter, priceFilter, products]);

  return (
    <div>
      <h2>Liste de produits</h2>
      <div>
        {/* Filtres */}
        <label>
          Couleur:
          <input
            type="text"
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
          />
        </label>
        <label>
          Catégorie:
          <input
            type="text"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </label>
        <label>
          Prix maximum:
          <input
            type="number"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </label>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>Prix: {product.price} $</p>

            <button
              onClick={() => {
                addToPanierlist(product.id);
                console.log("Produit ajouté au panier :", product.name);
              }}
            >
              Ajouter au panier
            </button>
            <button onClick={() => showProductDetails(product)}>
              Voir détails & comments
            </button>

            <button onClick={() => addToWishlist(product.id)}>
              Ajouter liste souhaits
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
