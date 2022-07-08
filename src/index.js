import "./pages/index.css"
//
// import {
//     formElementImage,
//     profileEditButton,
//     addButton,
//     popupImage,
//     popupEdit,
//     profileFormElement,
//     popups, object, avatarFormElement, profileAvatar, popupAvatar, profileName, profileOccupation, profilePhoto
// } from "./components/vars";
//
// import {handleCardFormSubmit, renderCard} from "./components/card.js";
// import {initInfo, openPopup, closePopup, editProfileInfo, editAvatar} from "./components/module.js";
// import {enableValidation} from "./components/validate.js";
// import {api, getAllCards, getProfileInfo} from "./components/api";
let userId;
import {
    gallery,
    templateSelector,
    popupFullscreen,
    fullscreenImage,
    popupFullscreenCap,
    avatarInput, editAvatarSubmitButton, avatar, avatarFormElement
} from "./components/vars.js";
//
// formElementImage.addEventListener("submit", (evt) => {
//     handleCardFormSubmit(evt);
// });
//
//
// // открытие попап c редактированием
// profileEditButton.addEventListener("click", function () {
//     openPopup(popupEdit);
//     initInfo();
// });
//
// //открытие попап добавления картинки
// addButton.addEventListener("click", function () {
//     openPopup(popupImage);
// });
// // открытие попапа с изменением аватара
// profileAvatar.addEventListener('click', () => {
//     openPopup(popupAvatar);
// })
//
// //закрытие оверлей или крестик
// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup')) {
//             closePopup(popup);
//         }
//         if (evt.target.classList.contains('popup__close-icon')) {
//             closePopup(popup)
//         }
//     })
// })
//
// const getCards = api.getAllCards();
//
// const getInfo = api.getProfileInfo();
//
//
//
// //изменение инфо в профиле по принятию формы
// profileFormElement.addEventListener("submit", editProfileInfo);
// //изменение аватара по принятию формы
// avatarFormElement.addEventListener('submit', editAvatar);
//
// Promise.all([getInfo, getCards])
//     .then(([userData, cards]) => {
//         // данные пользователя
//         profileName.textContent = userData.name;
//         profileOccupation.textContent = userData.about;
//         profilePhoto.src = userData.avatar;
//         userId = userData._id;
//         // отрисовка карточек
//         cards.forEach((object) => {
//             renderCard(object.link, object.name, object._id, object.owner._id, object.likes);
//         })
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//
//
//
// enableValidation(object);
// export {userId}

import Api from "./components/api.js";
//api
import Card from "./components/card.js";

import UserInfo from "./components/userInfo.js";

import PopupWithImage from "./components/popupWithImage.js";
import Section from "./components/section";

import PopupWithForm from "./components/popupWithForm.js";
import {inactivateButton, onLoading} from "./components/utils";
import {closePopup} from "./components/module";

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
    headers: {
        authorization: 'f3e97b96-69af-4630-b9bf-ac09d476caea',
        'Content-Type': 'application/json'
    }
});

//обработка кнопки лайка

export const handleClickLikeButton = (like, cardId, likeCounter) => {
        if (!like.classList.contains('gallery__like_active')) {
            api.sendLikeToServer(cardId)
                .then((res) => {
                    likeCounter.textContent = res.likes.length;
                    like.classList.toggle("gallery__like_active");
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            api.deleteLikeFromServer(cardId)
                .then((res) => {
                    likeCounter.textContent = res.likes.length;
                    like.classList.toggle("gallery__like_active");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
}

const popupWithImage = new PopupWithImage('.popup_fullscreen');

function handleImage(image, title) {
    popupWithImage.open(image, title);
    popupWithImage.setEventListeners();
}

//удаление карточки
const handleDeleteCard = (cardId, element) => {
api.deleteCardFromServer(cardId)
    .then(() => {
        element.remove();
    })
    .catch((err) => {
        console.log(err);
    })
}


//UserInfo
const userInfo = new UserInfo({
    userName: ".profile__name",
    userDescription: ".profile__occupation",
    userAvatar: ".profile__avatar",
});

//как-то надо преплести section
const sectionCards = new Section(
    {items: [],
        renderer: (data) => createCard(data, templateSelector)}
    ,
    ".gallery"
);

Promise.all([api.getProfileInfo(), api.getAllCards()])
    .then(([userData, cards]) => {
        // данные пользователя
        userInfo.setUserInfo(userData);
        userId = userInfo.getUserId();

        // отрисовка карточек
        cards.forEach((object) => {
            createCard(object, templateSelector);
        })
    })
    .catch((err) => {
        console.log(err);
    });




const createCard = (data, cardSelector) => {
    const card = new Card(data, cardSelector, handleClickLikeButton, handleDeleteCard, handleImage );
    const newCardElement = card.createCard();
    sectionCards.addItem(newCardElement);
}

//popupwithform 1) avatar









export {userId}