const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
    headers: {
        authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
        'Content-Type': 'application/json'
    }
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}


export const getAllCards = () => {

   return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
}

export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
}
//+

//обновление данных на сервере(profileInfo)
export const updateProfileInfo = (name, occupation) => {
   return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: occupation
        })
    })

}
//+

// обновление фото профиля
export const updateAvatar = (avatarLink) => {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink,
        })
    })

}
//+

//создание новой карточки
export const addCardToServer = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}

//удаление карточки с сервера
export const deleteCardFromServer = (cardId) => {
   return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
}
//+


//постановка лайков
export const sendLikeToServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
}
//+

//удаление лайка
export const deleteLikeFromServer = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })

}
//+

//Promise.all([getProfileInfo(), getAllCards()]);