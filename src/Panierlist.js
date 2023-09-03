import React from "react";
import ClearPanierButton from "./ClearPanierButton";

function Panierlist({ panierlist, onDelete, addToPanierlist, onClearPanier }) {
  const handleDelete = (productId) => {
    onDelete(productId);
  };
  const handleAddpanierlist = (productId) => {
    console.log(productId);
    addToPanierlist(productId);
  };

  return (
    <div>
      <h1>Contenu du panier</h1>

      {panierlist.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        <ul className="panier-list">
          {panierlist.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>Prix: {product.price} $</p>
              <button onClick={() => handleDelete(product.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClearPanier}>Vider Panier</button>
    </div>
  );
}

export default Panierlist;
