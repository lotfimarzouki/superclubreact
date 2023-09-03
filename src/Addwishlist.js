import React, { useState } from "react";
const ApiBaseUrl = "https://insta-api-api.0vxq7h.easypanel.host";
function Addwishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [productIdToAdd, setProductIdToAdd] = useState(""); // ID du produit à ajouter
  const handleProductIdChange = (event) => {
    setProductIdToAdd(event.target.value);
  };
  const handleAddToWishlist = async () => {
    if (productIdToAdd) {
      try {
        const response = await fetch(`${ApiBaseUrl}/wishlist/add-product`, {
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
          console.log("Produit ajouté à la liste de souhaits !");
          // Actualisez la liste de souhaits après l'ajout réussi si nécessaire
          fetchWishlist();
        } else {
          console.error(
            "Erreur lors de l'ajout du produit à la liste de souhaits"
          );
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${ApiBaseUrl}/wishlist`);
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      <h2>Ma Wishlist:</h2>
      <ul>
        {wishlist.map((product) => (
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
      <button onClick={handleAddToWishlist}>Ajouter à la Wishlist</button>
    </div>
  );
}

export default Addwishlist;
