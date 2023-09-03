import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

function ProductDetails({ product }) {
  if (!product) {
    return <div>Aucun produit sélectionné</div>;
  }

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // Nouvel état pour le chargement

  useEffect(() => {
    // Charger les commentaires pour le produit depuis l'API
    fetch(
      `https://insta-api-api.0vxq7h.easypanel.host/comments?productId=${product.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, [product.id]);

  const handleCommentAdded = (newComment) => {
    // Mettre à jour la liste des commentaires avec le nouveau commentaire ajouté
    setComments([...comments, newComment]);
    setLoading(false);
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const commentToDelete = comments.find(
        (comment) => comment.id === commentId
      );
      // if (!commentToDelete || !commentToDelete.canBeDeleted) {
      //   console.log("Comment cannot be deleted");
      //   return;
      // }

      await fetch(
        `https://insta-api-api.0vxq7h.easypanel.host/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      // Mettre à jour les commentaires en filtrant celui qui a été supprimé
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire", error);
    }
  };

  return (
    <div className="product-details">
      <h3>Détails du produit</h3>
      <img src={product.image} alt={product.name} />
      <p>Nom: {product.name}</p>
      <p>Description: {product.description}</p>
      <p>Prix: {product.price} $</p>
      <p>Catégorie: {product.category.name}</p>
      <p>Couleur: {product.color.name}</p>
      <ul>
        {comments.map((comment) => (
          <ol>
            {comment.content}
            {console.log(comment.content)}
            <button onClick={() => handleDeleteComment(comment.id)}>
              Supprimer
            </button>
          </ol>
        ))}
      </ul>
      {/* Afficher le formulaire d'ajout de commentaire */}
      <CommentForm productId={product.id} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

export default ProductDetails;
