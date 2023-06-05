import React from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";


function App() {

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard, setSelectedCard] = React.useState(null);
  const[currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserData()
    .then(userData => {
      setCurrentUser({
        ...userData,
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar
      })
    })
    .catch(error => console.log(`Error: ${error.status}`))
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          title={"Редактировать профиль"}
          popupName={"edit-profile"}
          buttonText={"Сохранить"}
          formId={"popup-profile-form"}
          formName={"profile-form"}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <fieldset className="popup__fieldset">
              <label className="popup__field">
                <input
                  name="popup-username"
                  type="text"
                  className="popup__input popup__input_el_name"
                  placeholder="Имя"
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="popup__input-error popup-username-error"></span>
              </label>
              <label className="popup__field">
                <input
                  name="popup-job"
                  type="text"
                  className="popup__input popup__input_el_job"
                  placeholder="Описание"
                  minLength="2"
                  maxLength="200"
                  required
                />
                <span className="popup__input-error popup-job-error"></span>
              </label>
            </fieldset>
          }
        />
        <PopupWithForm
          popupName={"add-place"}
          title={"Новое место"}
          buttonText={"Создать"}
          formId={""}
          formName={"place-form"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <fieldset className="popup__fieldset">
              <label className="popup__field">
                <input
                  name="card-name"
                  type="text"
                  className="popup__input popup__input_el_place-name"
                  placeholder="Название"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="popup__input-error card-name-error"></span>
              </label>
              <label className="popup__field">
                <input
                  name="card-link"
                  type="url"
                  className="popup__input popup__input_el_place-link"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="popup__input-error card-link-error"></span>
              </label>
            </fieldset>
          }
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          popupName={"confirm"}
          title={"Вы уверены?"}
          buttonText={"Да"}
          formId={""}
          formName={""}

          children={""}
          ></PopupWithForm>

          <PopupWithForm
          popupName={"update-avatar"}
          title={"Обновить аватар"}
          buttonText={"Сохранить"}
          formId={""}
          formName={"avatar-form"}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={
            <fieldset className="popup__fieldset">
            <label className="popup__field">
              <input
                name="avatar-link"
                type="url"
                className="popup__input popup__input_el_avatar-link"
                placeholder="Введите ссылку"
                required
              />
              <span className="popup__input-error avatar-link-error"></span>
            </label>
          </fieldset>
          }
          ></PopupWithForm>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
