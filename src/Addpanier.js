import React, { useState } from "react";
const ApiBaseUrl = "https://insta-api-api.0vxq7h.easypanel.host";
function Addpanierlist() {
  const [panierlist, setpanierlist] = useState([]);
  const [productIdToAdd, setProductIdToAdd] = useState(""); // ID du produit à ajouter
  const handleProductIdChange = (event) => {
    setProductIdToAdd(event.target.value);
  };
  const handleAddToPanierlist = async () => {
    if (productIdToAdd) {
      try {
        const response = await fetch(`${ApiBaseUrl}/cart/add-product`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: parseInt(productIdToAdd),
          }),
        });

        if (response.ok) {
          console.log("Produit ajouté au panier !");

          fetchPanierlist();
        } else {
          console.error("Erreur lors de l'ajout du produit au panier");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  const fetchPanierlist = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}/cart`);
      const data = await response.json();
      setpanierlist(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      <h2>Panier:</h2>
      <ul>
        {panierlist.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>

      <h2>Ajouter un produit à la wishlist:</h2>
      <label>
        ID du produit:
        <input
          type="text"
          value={productIdToAdd}
          onChange={handleProductIdChange}
        />
      </label>
      <button onClick={handleAddToPanierlist}>Ajouter au panier</button>
    </div>
  );
}

export default Addpanierlist;
