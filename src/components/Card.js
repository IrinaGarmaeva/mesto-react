import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteButtonClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${
    isLiked && "place__like-button_active"
  }`;

  return (
    <article className="place">
      <img
        className="place__photo"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      {isOwn && (
        <button
          className="place__delete-button"
          type="button"
          onClick={() => onDeleteButtonClick(card)}
        >
          <span className="sr-only">Удалить</span>
        </button>
      )}
      <div className="place__descriprion">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          >
            <span className="sr-only">Лайк</span>
          </button>
          <p className="place__like-button__counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
