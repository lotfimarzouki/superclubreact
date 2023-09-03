import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm.toLowerCase()); // Transmettre le terme de recherche en minuscules
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher par nom de produit"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default SearchBar;

// import React, { useState } from "react";
// function SearchBar({ onSearch, products }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const handleSearch = () => {
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);

//     onSearch(filtered); // Passer les produits filtrés à la fonction parent
//   };
//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Rechercher par nom de produit"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Rechercher</button>
//     </div>
//   );
// }

// export default SearchBar;
