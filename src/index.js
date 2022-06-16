import "./pages/index.css"

import {
    formElementImage,
    profileEditButton,
    addButton,
    popupImage,
    popupEdit,
    profileFormElement,
    popups, object, avatarFormElement, profileAvatar, popupAvatar
} from "./components/vars";

import {handleCardFormSubmit} from "./components/card.js";
import {initInfo, openPopup, closePopup, editProfileInfo, editAvatar} from "./components/module.js";
import {enableValidation} from "./components/validate.js";
import {getAllCards, getProfileInfo} from "./components/api";

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

getAllCards();
getProfileInfo();

//изменение инфо в профиле по принятию формы
profileFormElement.addEventListener("submit", editProfileInfo);
//изменение аватара по принятию формы
avatarFormElement.addEventListener('submit', editAvatar);


enableValidation(object);