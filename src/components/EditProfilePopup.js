import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const[name, setName] = React.useState('');
  const[description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }


  return (
    <PopupWithForm
    title={"Редактировать профиль"}
    popupName={"edit-profile"}
    buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    formId={"popup-profile-form"}
    formName={"profile-form"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    children={
      <fieldset className="popup__fieldset">
        <label className="popup__field">
          <input
            value={name || ''}
            name="popup-username"
            type="text"
            className="popup__input popup__input_el_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChangeName}
          />
          <span className="popup__input-error popup-username-error"></span>
        </label>
        <label className="popup__field">
          <input
            value={description || ''}
            name="popup-job"
            type="text"
            className="popup__input popup__input_el_job"
            placeholder="Описание"
            minLength="2"
            maxLength="200"
            required
            onChange={handleChangeDescription}
          />
          <span className="popup__input-error popup-job-error"></span>
        </label>
      </fieldset>
    }
  />
  );
}

export default EditProfilePopup;
