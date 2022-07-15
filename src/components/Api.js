export default class Api {
    constructor({headers, baseUrl}) {
        this._headers = headers;
        this._baseUrl = baseUrl;

    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._checkResponse(res));
    }

    getAllCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    addCardToServer(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => this._checkResponse(res));
    }

    updateProfileInfo(name, occupation) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: occupation
            })
        })
            .then((res) => this._checkResponse(res));

    }

    updateAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink,
            })
        })
            .then((res) => this._checkResponse(res));

    }

    deleteCardFromServer(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    sendLikeToServer(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    deleteLikeFromServer(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));

    }

    // другие методы работы с API
}
