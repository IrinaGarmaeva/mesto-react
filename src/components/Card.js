import React from "react";

function Card({card, handleOpenImage}) {
  return (
    <template id="cardTemplate">
      <article className="place">
        <img className="place__photo" src={card.url} alt={card.name} onClick={handleOpenImage}/>
        <button className="place__delete-button" type="button">
          <span className="sr-only">Удалить</span>
        </button>
        <div className="place__descriprion">
          <h2 className="place__name">{card.name}</h2>
          <div className="place__like-container">
            <button className="place__like-button" type="button">
              <span className="sr-only">Лайк</span>
            </button>
            <p className="place__like-button__counter">0</p>
          </div>
        </div>
      </article>
    </template>
  );
}

export default Card;
