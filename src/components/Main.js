import React from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
    .then(cards => setCards(cards))
    .catch((error) => console.log(`Error: ${error.status}`))
  }, [])

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__block">
          <div className="profile__block-avatar">
            <img
              src={currentUser.avatar}
              alt="аватар пользователя"
              className="profile__avatar"
              onClick={onEditAvatar}
            />
            <button className="button button_type_edit-avatar" type="button">
              <span className="sr-only">Редактировать</span>
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__change">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="button button_type_edit-profile"
                type="button"
                onClick={onEditProfile}
              >
                <span className="sr-only">Редактировать</span>
              </button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button button_type_add"
          type="button"
          onClick={onAddPlace}
        >
          <span className="sr-only">Добавить</span>
        </button>
      </section>
      <section className="places" aria-label="Секция с карточками">
        {cards.map((item) => {
          return <Card key={item._id} card={item} onCardClick={onCardClick} />;
        })}
      </section>
    </main>
  );
}

export default Main;
