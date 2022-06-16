import {
    avatar,
    editAvatarSubmitButton,
    editProfileInfoSubmitButton,
    jobInput,
    nameInput,
    object,
    popupAvatar,
    popupEdit,
    profileName,
    profileOccupaton,
    avatarInput
} from "./vars.js";
import {deleteLikeFromServer, sendLikeToServer, updateAvatar, updateProfileInfo} from "./api";


//закрытие на Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}


// открытие попап
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEsc);

}


// закрытие попап
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEsc);
}


// установка начальных данных в попапе для редактирования профиля
function initInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupaton.textContent;
}

// обновление информации в профиле
function editProfileInfo(evt) {
    evt.preventDefault();
    onLoading(true, editProfileInfoSubmitButton);
    profileName.textContent = nameInput.value;
    profileOccupaton.textContent = jobInput.value;
    updateProfileInfo(nameInput.value, jobInput.value, editProfileInfoSubmitButton);
    closePopup(popupEdit);
}


function inactivateButton(popup) {
    const sendButton = popup.querySelector('.popup__send');
    sendButton.classList.add(object.inactiveButtonClass);
    sendButton.disabled = true;
}

//token: f3e97b96-69af-4630-b9bf-ac09d476caea
//cohorta: plus-cohort-11

//получение карт с сервера
// const getAllCards = () => {
//
//     fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
//         method: 'GET',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea'
//         }
//     })
//         .then((res) => {
//             if(res.ok) {
//                 return res.json();
//             }
//         })
//         .then((res) => {
//                 res.forEach((object) => {
//                     prependCard(object.link, object.name, object._id, object.owner._id, object.likes);
//                 })
//             }
//         )
//         .catch((err) => {
//             console.log(err);
//         })
// }


//получение имени с сервера
// const getProfileInfo = () => {
//     fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
//         method: 'GET',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea'
//         }
//     })
//         .then((res) => {
//             if(res.ok) {
//                 return res.json();
//             }
//         })
//         .then((result) => {
//             profileName.textContent = result.name;
//             profileOccupaton.textContent = result.about;
//             profilePhoto.src = result.avatar;
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }


// //обновление данных на сервере(profileInfo)
// const updateProfileInfo = (name, occupation, button) => {
//     fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
//         method: 'PATCH',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: name,
//             about: occupation
//         })
//     })
//         .catch((err) => {
//             console.log(err);
//         })
//         .finally(() => {
//             onLoading(false, button)
//         })
// }
// // обновление фото профиля
// const updateAvatar = (avatarLink, button) => {
//     fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me/avatar', {
//         method: 'PATCH',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             avatar: avatarLink,
//         })
//     })
//         .catch((err) => {
//             console.log(err);
//         })
//         .finally(() => {
//             onLoading(false, button)
//         })
// }


// //создание новой карточки
// const addCardToServer = (name, link, button) => {
//     fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
//         method: 'POST',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: name,
//             link: link
//         })
//     })
//         .catch((err) => {
//             console.log(err);
//         })
//         .finally(() => {
//             onLoading(false, button)
//         })
// }


// const deleteCardFromServer = (cardId) => {
//     fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/${cardId}`, {
//         method: 'DELETE',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
//             'Content-Type': 'application/json'
//         }
//     })
// }


//функция изменения картинки


const editAvatar = (evt) => {
    evt.preventDefault();
    const imageLink = avatarInput.value;
    avatar.src = imageLink;
    onLoading(true, editAvatarSubmitButton);
    updateAvatar(imageLink, editAvatarSubmitButton);
    closePopup(popupAvatar);
    avatarInput.value = '';
}

// //постановка лайков
// const sendLikeToServer = (cardId, likeCounter) => {
//     fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardId}`, {
//         method: 'PUT',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((res) => {
//             if (res.ok) {
//                 return res.json();
//             }
//         })
//         .then((res) => {
//             likeCounter.textContent = res.likes.length;
//             console.log(res.likes);
//         })
//
// }
//
// //удаление лайка
// const deleteLikeFromServer = (cardId, likeCounter) => {
//     fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardId}`, {
//         method: 'DELETE',
//         headers: {
//             authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((res) => {
//             if (res.ok) {
//                 return res.json();
//             }
//         })
//         .then((res) => {
//             likeCounter.textContent = res.likes.length;
//             console.log(res.likes);
//         })
// }

const toggleLike = (like, cardId, likeCounter) => {
    if (like.classList.contains('gallery__like_active')) {
        sendLikeToServer(cardId, likeCounter);
    } else {
        deleteLikeFromServer(cardId, likeCounter);
    }
}


const onLoading = (status, button) => {
    if (status) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранение'
    }
}

export {
    closePopup, initInfo, editProfileInfo, openPopup, inactivateButton, toggleLike, onLoading, editAvatar
}
