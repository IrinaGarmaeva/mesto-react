import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onClose, onDeleteCard, card, isLoading }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      popupName={"confirm"}
      title={"Вы уверены?"}
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formId={""}
      formName={""}
      children={""}
    />
  );
}

export default ConfirmPopup;
