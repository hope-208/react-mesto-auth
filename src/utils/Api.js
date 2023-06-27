class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editMyProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addPhoto({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editMyAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '107572fd-a23a-435b-9724-668d3d26cd42',
    'Content-Type': 'application/json',
  },
});

export default api;
