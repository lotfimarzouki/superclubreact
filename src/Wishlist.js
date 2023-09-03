import React from "react";
function Wishlist({ wishlist, onDelete, addToWishlist }) {
  const handleDelete = (productId) => {
    onDelete(productId);
  };
  const handleAddwishlist = (productId) => {
    console.log(productId);
    addToWishlist(productId);
  };
  return (
    <div>
      <h1>Liste de souhaits</h1>
      <ul className="wish-list">
        {wishlist.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>Prix: {product.price} $</p>
            <button onClick={() => handleDelete(product.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Wishlist;
