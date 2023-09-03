import React, { useState } from "react";
import SearchBar from "./SearchBar"; // Assurez-vous que le chemin d'accès est correct

function Menu({ setView, onSearch }) {
  const [view, setCurrentView] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    onSearch(searchTerm.toLowerCase()); // Transmettre le terme de recherche en minuscules
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (newView) => {
    setCurrentView(newView);
    setIsDropdownOpen(false); // Ferme la dropdown après le clic
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          SuperClub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={`nav-link ${view === "products" ? "active" : ""}`}
                href="#"
                onClick={() => setView("products")}
              >
                Liste de produits
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${view === "wishlist" ? "active" : ""}`}
                href="#"
                onClick={() => setView("wishlist")}
              >
                Liste de souhaits
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${view === "panierlist" ? "active" : ""}`}
                href="#"
                onClick={() => setView("panierlist")}
              >
                Liste panier
              </a>
            </li>
            <li className="nav-item dropdown">
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    className={`dropdown-item ${
                      view === "panierlist" ? "active" : ""
                    }`}
                    href="#"
                    onClick={() => setView("panierlist")}
                  >
                    Voir le panier
                  </a>
                </li>
                {/* Ajoute d'autres options de la dropdown ici si nécessaire */}
              </ul>
            </li>
            <li className="nav-item">
              <SearchBar onSearch={onSearch} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
