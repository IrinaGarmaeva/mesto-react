import React from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard, setSelectedCard] = React.useState(null);
  const[currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  React.useEffect(() => {
    api.getInitialCards()
    .then(cards => setCards(cards))
    .catch((error) => console.log(`Error: ${error.status}`))
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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    isLiked ?
    api.deleteLike(card._id).then(newCard => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch(error => console.log(`Error: ${error.status}`))
    : api.putLike(card._id).then(newCard => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch(error => console.log(`Error: ${error.status}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(res => {
      setCards(newCardData => newCardData.filter(c => c._id !== card._id))
    })
    .catch(error => console.log(`Error: ${error.status}`))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.editUserData({newName: name, newAbout: about})
    .then(res => {
      setCurrentUser({
        ...res,
        name: res.name,
        about: res.about,
      })
    })
    .then(() => closeAllPopups())
    .catch(error => console.log(`Error: ${error.status}`))
  }

  function handleUpdateAvatar ({ avatar }) {
    api.setUserAvatar({ link: avatar })
    .then(res => {
      setCurrentUser({
        ...res,
        avatar: res.avatar,
      })
    })
    .then(() => closeAllPopups())
    .catch(error => console.log(`Error: ${error.status}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
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
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          {/* <PopupWithForm
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
          ></PopupWithForm> */}
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
