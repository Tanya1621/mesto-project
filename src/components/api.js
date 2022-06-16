import {prependCard} from "./card";
import {profileName, profileOccupaton, profilePhoto} from "./vars";
import {onLoading} from "./module";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
    headers: {
        authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
        'Content-Type': 'application/json'
    }
}


export const getAllCards = () => {

    fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
                res.forEach((object) => {
                    prependCard(object.link, object.name, object._id, object.owner._id, object.likes);
                })
            }
        )
        .catch((err) => {
            console.log(err);
        })
}

export const getProfileInfo = () => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            profileName.textContent = result.name;
            profileOccupaton.textContent = result.about;
            profilePhoto.src = result.avatar;
        })
        .catch((err) => {
            console.log(err);
        })
}


//обновление данных на сервере(profileInfo)
export const updateProfileInfo = (name, occupation, button) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: occupation
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, button)
        })
}

// обновление фото профиля
export const updateAvatar = (avatarLink, button) => {
    fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink,
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, button)
        })
}

//создание новой карточки
export const addCardToServer = (name, link, button) => {
    fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, button)
        })
}

//удаление карточки с сервера
export const deleteCardFromServer = (cardId) => {
    fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
}


//постановка лайков
export const sendLikeToServer = (cardId, likeCounter) => {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            likeCounter.textContent = res.likes.length;
            console.log(res.likes);
        })

}

//удаление лайка
export const deleteLikeFromServer = (cardId, likeCounter) => {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            likeCounter.textContent = res.likes.length;
            console.log(res.likes);
        })
}
