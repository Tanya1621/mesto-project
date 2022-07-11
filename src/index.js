import "./pages/index.css"
let userId;
import {
    profileAvatar,
    templateSelector,
    profileEditButton,
    popupImage,
    addButton,
    object,
    popupAvatar,
    popupEdit
} from "./components/vars.js";

import Api from "./components/api.js";
//api
import Card from "./components/card.js";

import UserInfo from "./components/userInfo.js";

import PopupWithImage from "./components/popupWithImage.js";
import Section from "./components/section";

import PopupWithForm from "./components/popupWithForm.js";

import FormValidator from "./components/validate";

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
    {
        items: [],
        renderer: (data) => createCard(data, templateSelector)
    }
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
            console.log(object);
        })
    })
    .catch((err) => {
        console.log(err);
    });


const createCard = (data, cardSelector) => {
    const card = new Card(data, cardSelector, handleClickLikeButton, handleDeleteCard, handleImage);
    const newCardElement = card.createCard();
    sectionCards.addItem(newCardElement);
}

//popupwithform 1) avatar

const submitAvatarHandler = (inputValues) => {
    popupAvatarClass.submitButton.textContent = "Сохранение...";
    api.updateAvatar(inputValues.avatar_link)
        .then(() => {
            userInfo.getUserAvatar(inputValues.avatar_link);
            popupAvatarClass.close();
        })
        .catch((err) => alert(err))
        .finally(() => popupAvatarClass.submitButton.textContent = "Сохранить");
}

const popupAvatarClass = new PopupWithForm(
    ".popup_avatar",
    submitAvatarHandler
)
popupAvatarClass.setEventListeners();
profileAvatar.addEventListener("click", () => {
    popupAvatarClass.open();
})

const popupAvatarValidator = new FormValidator(object, popupAvatar);
popupAvatarValidator.enableValidation();


//editProfile
const submitEditHandler = (inputValues) => {
    editInfoPopup.submitButton.textContent = "Сохранение...";
    api.updateProfileInfo(inputValues.user_name, inputValues.user_occupation)
        .then(() => {
            userInfo.getUserInfo(inputValues.user_name, inputValues.user_occupation);
            editInfoPopup.close();
        })
        .catch((err) => alert(err))
        .finally(() => editInfoPopup.submitButton.textContent = "Сохранить");
}


const editInfoPopup = new PopupWithForm(
    ".popup_edit",
    submitEditHandler
)
editInfoPopup.setEventListeners();


profileEditButton.addEventListener("click", () => {
    editInfoPopup.open();
})

const editInfoValidator = new FormValidator(object, popupEdit);
editInfoValidator.enableValidation();


// new card popup

const submitAddHandler = (inputValues) => {
    addCardPopup.submitButton.textContent = "Сохранение...";
    api.addCardToServer(inputValues.place_name, inputValues.place_link)
        .then((res) => {
            createCard({
                link: inputValues.place_link,
                name: inputValues.place_name,
                likes: res.likes,
                _id: res._id,
                owner: {_id: res.owner._id}
            }, templateSelector);
            addCardPopup.close();
        })
        .catch((err) => alert(err))
        .finally(() => addCardPopup.submitButton.textContent = "Сохранить");
}


// addNewCard
const addCardPopup = new PopupWithForm(
    ".popup_image",
    submitAddHandler
)
addCardPopup.setEventListeners();
addButton.addEventListener("click", () => {
    addCardPopup.open();
})

const addCardValidator = new FormValidator(object, popupImage);
addCardValidator.enableValidation();


export {userId}