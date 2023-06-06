import React from "react";

function PopupWithForm({
  popupName,
  title,
  children,
  buttonText,
  formId,
  formName,
  isOpen,
  onClose,
  onSubmit
}) {
  return (
    <div
      className={`popup popup_type_${popupName} ${
        isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          action="URL"
          className="popup__form"
          id={formId}
          name={formName}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
