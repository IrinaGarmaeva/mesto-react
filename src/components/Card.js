import React from "react";

function Card({ card, onCardClick }) {

function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="place">
      <img
        className="place__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button className="place__delete-button" type="button">
        <span className="sr-only">Удалить</span>
      </button>
      <div className="place__descriprion">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button className="place__like-button" type="button">
            <span className="sr-only">Лайк</span>
          </button>
          <p className="place__like-button__counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
