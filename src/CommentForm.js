import React, { useState } from "react";
function CommentForm({ productId, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer le commentaire à l'API
    fetch(`https://insta-api-api.0vxq7h.easypanel.host/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ comment }),
      body: JSON.stringify({
        content: comment,
        productId: productId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Appeler la fonction parent pour indiquer que le commentaire a été ajouté
        onCommentAdded(data);
        setComment(""); // Réinitialiser le champ de commentaire
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="comment">
          <b>Ajouter un commentaire :</b>
        </label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Ajouter un commentaire
      </button>
    </form>
  );
}

export default CommentForm;
