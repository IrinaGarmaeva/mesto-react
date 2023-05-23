import React from "react";

function ImagePopup({card, closePopup}) {
  return (
    <div className={`popup popup_type_open-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__block">
        <figure className="popup__image">
          <button
            className="popup__close-button popup__close-button_type_image"
            type="button"
            onClick={closePopup}
          ></button>
          <img className="popup__photo" alt={card.name} src={card.link} />
          <figcaption className="popup__heading">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
