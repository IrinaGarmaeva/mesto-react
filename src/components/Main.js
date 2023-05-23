import React from "react";


function Main({onEditProfile, onAddPlace, onEditAvatar}) {
  
  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__block">
          <div className="profile__block-avatar">
            <img
              src="<%=require('./images/avatar.jpg')%>"
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
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button className="button button_type_edit-profile" type="button" onClick={onEditProfile}>
                <span className="sr-only">Редактировать</span>
              </button>
            </div>
            <p className="profile__about">Исследователь океана</p>
          </div>
        </div>
        <button className="button button_type_add" type="button" onClick={onAddPlace}>
          <span className="sr-only">Добавить</span>
        </button>
      </section>
      <section className="places" aria-label="Секция с карточками"></section>
    </main>
  );
}

export default Main;
