class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
  }

// Загрузка информации о пользователе с сервера
  async getUserData() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers
});
    return this._checkResponse(response);
}

  // Загрузка карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
      return this._checkResponse(response);
  };

  // Редактирование профиля
  async editUserData({newName, newAbout}) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    return this._checkResponse(response);
  }

  // Добавление новой карточки
  async addNewCard({newName, newLink}) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": newName,
        "link": newLink
      }),
    })

    return this._checkResponse(response);
  }

  // Удаление карточки
  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    return this._checkResponse(response);
  }

  // Постановка и снятие лайка
  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })

    return this._checkResponse(response);
  }

  async deleteLike(cardId){
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })

    return this._checkResponse(response);
  }

  // Обновление аватара пользователя
  async setUserAvatar({link}) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link,
      }),
    })
    return this._checkResponse(response);
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '1ddaccfd-6cdb-4497-bcf7-c6a054674d3b',
    'Content-Type': 'application/json'
}
});

export default api;
