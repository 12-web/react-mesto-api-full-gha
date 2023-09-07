class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // получение овтета на запрос
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //отправка запроса и обработка ответа
  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._getResponseData);
  }

  // получение карточек
  getInitialCards() {
    return this._request('/cards', {
      method: 'GET',
      credentials: 'include',
    });
  }
  // получение информации пользователя
  getUserInformation() {
    return this._request('/users/me', {
      method: 'GET',
      credentials: 'include',
    });
  }
  // изменение информации пользователя
  editProfileData(name, about) {
    return this._request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  // изменение аватара пользователя
  editUserAvatar(avatar) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
  // добавление новой карточки
  addNewCard(name, link) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  // удаление карточки
  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }
  // изменение статуса лайка
  changeLikeCardStatus(id, isLiked) {
    return this._request(`/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.likee.nomoredomainsic.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
