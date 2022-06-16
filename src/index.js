import "./pages/index.css"

import {
    formElementImage,
    profileEditButton,
    addButton,
    popupImage,
    popupEdit,
    profileFormElement,
    popups, object, avatarFormElement, profileAvatar, popupAvatar, profileName, profileOccupaton, profilePhoto
} from "./components/vars";

import {handleCardFormSubmit, prependCard} from "./components/card.js";
import {initInfo, openPopup, closePopup, editProfileInfo, editAvatar} from "./components/module.js";
import {enableValidation} from "./components/validate.js";
import {checkResponse, getAllCards, getProfileInfo} from "./components/api";
let userId;

formElementImage.addEventListener("submit", handleCardFormSubmit);


// открытие попап c редактированием
profileEditButton.addEventListener("click", function () {
    openPopup(popupEdit);
    initInfo();
});

//открытие попап добавления картинки
addButton.addEventListener("click", function () {
    openPopup(popupImage);
});
// открытие попапа с изменением аватара
profileAvatar.addEventListener('click', () => {
    openPopup(popupAvatar);
})

//закрытие оверлей или крестик
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-icon')) {
            closePopup(popup)
        }
    })
})

const getCards = getAllCards()
    .then(checkResponse);

const getInfo = getProfileInfo()
    .then(checkResponse);



//изменение инфо в профиле по принятию формы
profileFormElement.addEventListener("submit", editProfileInfo);
//изменение аватара по принятию формы
avatarFormElement.addEventListener('submit', editAvatar);

Promise.all([getInfo, getCards])
    .then(([userData, cards]) => {
        // данные пользователя
        profileName.textContent = userData.name;
        profileOccupaton.textContent = userData.about;
        profilePhoto.src = userData.avatar;
        userId = userData._id;
        console.log(cards)
        console.log(userData)
        // отрисовка карточек
        cards.forEach((object) => {
            prependCard(object.link, object.name, object._id, object.owner._id, object.likes);
        })
    })
    .catch((err) => {
        console.log(err);
    })



enableValidation(object);
export {userId}