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
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser({
          ...userData,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        });
      })
      .catch((error) => console.log(`Error: ${error.status}`));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((error) => console.log(`Error: ${error.status}`));
  }, []);

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
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
          .deleteLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((error) => console.log(`Error: ${error.status}`))
      : api
          .putLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((error) => console.log(`Error: ${error.status}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((newCardData) =>
          newCardData.filter((c) => c._id !== card._id)
        );
      })
      .catch((error) => console.log(`Error: ${error.status}`));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserData({ newName: name, newAbout: about })
      .then((res) => {
        setCurrentUser({
          ...res,
          name: res.name,
          about: res.about,
        });
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(`Error: ${error.status}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ link: avatar })
      .then((res) => {
        setCurrentUser({
          ...res,
          avatar: res.avatar,
        });
      })
      .then(() => closeAllPopups())
      .catch((error) => console.log(`Error: ${error.status}`));
  }

  function handleAddNewCard({ name, link }) {
    api
      .addNewCard({ newName: name, newLink: link })
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((error) => console.log(`Error: ${error.status}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddNewCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm
            popupName={"confirm"}
            title={"Вы уверены?"}
            buttonText={"Да"}
            formId={""}
            formName={""}
            children={""}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
