import "./pages/index.css"

import {
    formElementImage,
    initialCards,
    profileEditButton,
    addButton,
    popupImage,
    popupEdit,
    profileFormElement,
    popups, object
} from "./components/vars";

import {handleCardFormSubmit, prependCard} from "./components/card.js";
import {initInfo, openPopup, closePopup, editProfileInfo} from "./components/modale.js";
import {enableValidation} from "./components/validate.js";

formElementImage.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((element) => {
    prependCard(element.link, element.name);
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


profileFormElement.addEventListener("submit", editProfileInfo);


enableValidation(object);