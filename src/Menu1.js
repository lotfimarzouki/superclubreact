import React from "react";
import "./Menu.css";

function Menu() {
  const handleSearch = (e) => {
    e.preventDefault();
    const pubId = document.getElementById("pubId").value;
    const apiSearch =
      "https://insta-api-api.0vxq7h.easypanel.host/products?search=";
    fetch(apiSearch + pubId)
      .then((response) => response.json())
      .then((data) => {
        const publicationList = document.getElementById("publication-list");
        publicationList.innerHTML = "";
        data.forEach((publication) => {
          const publicationDiv = document.createElement("div");
          publicationDiv.className = "publication";
          const imageUser = document.createElement("img");
          imageUser.src = publication.pictureUrl;
          publicationDiv.appendChild(imageUser);
          publicationList.appendChild(publicationDiv);
          const descriptDiv = document.createElement("div");
          descriptDiv.textContent = publication.description;
          publicationDiv.append(descriptDiv);
        });
      });
  };

  return (
    <header>
      <h1>Super Club</h1>
      <nav>
        <ul>
          <li>
            <a href="index.html">Publications</a>
          </li>
          <li>
            <a href="#cafes">Cafés</a>
          </li>
          <li>
            <a href="AddProductForm.js">Panier</a>
          </li>
          <li>
            <a href="deletecafe.html">Delete Cafés</a>
          </li>
          <li>
            <form id="searchPublication" onSubmit={handleSearch}>
              <input type="text" placeholder="Publication" id="pubId" />
              <button id="btnSearch">Chercher</button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
