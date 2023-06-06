import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  let avatarRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({ avatar: avatarRef.current.value})
  }

  return(
    <PopupWithForm
    popupName={"update-avatar"}
    title={"Обновить аватар"}
    buttonText={"Сохранить"}
    formId={""}
    formName={"avatar-form"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    children={
      <fieldset className="popup__fieldset">
      <label className="popup__field">
        <input
          name="avatar-link"
          type="url"
          className="popup__input popup__input_el_avatar-link"
          placeholder="Введите ссылку"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error avatar-link-error"></span>
      </label>
    </fieldset>
    }
    />
  )
}

export default EditAvatarPopup;
