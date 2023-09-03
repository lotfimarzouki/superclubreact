import React, { useState, useEffect } from "react";
import "./App.css";
import Menu from "./Menu.js";
import Productlist from "./Productlist";
import Addwishlist from "./Addwishlist";
import Wishlist from "./Wishlist";
import Panierlist from "./Panierlist";
import ProductDetails from "./ProductDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import Addpanier from "./Addpanier";
import ClearPanierButton from "./ClearPanierButton";
import SearchBar from "./SearchBar";
function App() {
  const [currentView, setCurrentView] = useState("products");
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [panierlist, setPanierlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const ajoutproduit = (produit) => {
    setWishlist([...wishlist, produit]);
  };
  const ajoutcart = (produit) => {
    setPanierlist([...panierlist, produit]);
  };
  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentView("productDetails");
  };

  const addToWishlist = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (!wishlist.some((product) => product.id === productId)) {
      setWishlist([...wishlist, productToAdd]);
    } else {
      console.log("Product already in wishlist.");
    }
  };

  const addToPanierlist = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (!panierlist.some((product) => product.id === productId)) {
      setPanierlist([...panierlist, productToAdd]);
    } else {
      console.log("Product est deja dans panierlist.");
    }
  };

  const setView = (view) => {
    setCurrentView(view);
    console.log("Current View:", view);
  };
  const deleteFromPanierlist = (productId) => {
    const updatedPanierlist = panierlist.filter(
      (product) => product.id !== productId
    );
    setPanierlist(updatedPanierlist);
  };

  const deleteFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== productId
    );
    setWishlist(updatedWishlist);
  };
  // Fonction pour vider le panier
  const clearPanier = () => {
    fetch("https://insta-api-api.0vxq7h.easypanel.host/cart/clear", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettez à jour l'état du panier après le vidage
        setPanierlist([]);
      })
      .catch((error) => {
        console.error("Error clearing panier:", error);
      });
  };
  const handleSearch = (searchTerm) => {
    // Faites la logique de recherche ici
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mettez à jour l'état des produits affichés
    setFilteredProducts(filteredProducts);
  };
  useEffect(() => {
    const panierlistApiUrl = "https://insta-api-api.0vxq7h.easypanel.host/cart";

    fetch(panierlistApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPanierlist(data);
      })
      .catch((error) => {
        console.error("Error fetching panier data:", error);
      });
  }, []);

  //
  useEffect(() => {
    const wishlistApiUrl =
      "https://insta-api-api.0vxq7h.easypanel.host/wishlist";

    fetch(wishlistApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWishlist(data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist data:", error);
      });
  }, []);

  //
  useEffect(() => {
    const apiUrl = "https://insta-api-api.0vxq7h.easypanel.host/products";
    const apiProductCategorie =
      "https://insta-api-api.0vxq7h.easypanel.host/product-categories";
    //  const apiwishlist = "https://insta-api-api.0vxq7h.easypanel.host/wishlist";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  //
  let contentView;
  if (currentView === "products") {
    contentView = (
      <Productlist
        products={products}
        addwishlist={ajoutproduit}
        showProductDetails={showProductDetails}
        addToWishlist={addToWishlist}
        addToPanierlist={addToPanierlist}
      />
    );
  } else if (currentView === "addWishlist") {
    contentView = <Addwishlist />;
  } else if (currentView === "wishlist") {
    contentView = (
      <Wishlist wishlist={wishlist} onDelete={deleteFromWishlist} />
    );
  } else if (currentView === "productDetails") {
    contentView = <ProductDetails product={selectedProduct} />;
  } else if (currentView === "panierlist") {
    // Ajout de la vue "panierlist"
    contentView = (
      <Panierlist
        panierlist={panierlist}
        onDelete={deleteFromPanierlist}
        addToPanierlist={addToPanierlist}
        onClearPanier={clearPanier}
      />
    );
  } else {
    contentView = (
      <Productlist
        products={products}
        addwishlist={ajoutproduit}
        showProductDetails={showProductDetails}
        addToWishlist={addToWishlist}
        addToPanierlist={addToPanierlist}
        //addToPanierlist={ajoutcart}
      />
    );
  }

  return (
    <div className="App">
      <Menu setView={setCurrentView} onSearch={handleSearch} />
      <div className="content">{contentView}</div>
    </div>
  );
}
export default App;
