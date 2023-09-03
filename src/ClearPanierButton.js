import React from "react";

function ClearPanierButton({ onClearPanier }) {
  const handleClearPanier = () => {
    // Appeler la fonction pour vider le panier
    onClearPanier();
  };

  return (
    <button className="btn btn-danger" onClick={handleClearPanier}>
      Vider le panier
    </button>
  );
}

export default ClearPanierButton;
