import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState("Исследователь");
  const [userAvatar, setUserAvatar] = React.useState(
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  );
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userProfile, cards]) => {
        setUserName(userProfile.name);
        setUserDescription(userProfile.about);
        setUserAvatar(userProfile.avatar);
        setCards(cards);
      })
      .catch((error) => console.log(`Error: ${error.status}`));
  }, []);

  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__block">
          <div className="profile__block-avatar">
            <img
              src={userAvatar}
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
              <h1 className="profile__name">{userName}</h1>
              <button
                className="button button_type_edit-profile"
                type="button"
                onClick={onEditProfile}
              >
                <span className="sr-only">Редактировать</span>
              </button>
            </div>
            <p className="profile__about">{userDescription}</p>
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
