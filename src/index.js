import "./pages/index.css"

import {
    formElementImage,
    initialCards,
    profileEditButton,
    addButton,
    closeButtons,
    popupImage,
    popupEdit,
    formElement,
    popups
} from "./components/vars";

import {createCard, initCard} from "./components/card.js";
import {initInfo, openPopup, closePopup, editProfileInfo} from "./components/modale.js";
import {enableValidation} from "./components/validate.js";

formElementImage.addEventListener("submit", createCard);

initialCards.forEach((element) => {
    initCard(element.link, element.name);
});

// открытие попап c редактированием
profileEditButton.addEventListener("click", function () {
    openPopup(popupEdit);
    initInfo();
});

//открытие попап добавления картинки
addButton.addEventListener("click", function () {
    openPopup(popupImage);
});
//обработка клика по крестику
closeButtons.forEach(function (cl) {
    cl.addEventListener("click", function () {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    });
});
//закрытие на escape или оверлей

popups.forEach((popup) => {
    window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    });
    window.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') && popup.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
})


formElement.addEventListener("submit", editProfileInfo);


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__send',
    inactiveButtonClass: 'popup__send_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
});