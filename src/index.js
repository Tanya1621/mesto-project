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
    popupEdit, profileNameInput, profileName, profileOccupationInput, profileOccupation
} from "./components/utils/vars.js";

import Api from "./components/Api";
//api
import Card from "./components/Card.js";

import UserInfo from "./components/UserInfo.js";

import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";

import PopupWithForm from "./components/PopupWithForm.js";

import FormValidator from "./components/FormValidator.js";
import {onLoading} from "./components/utils/utils.js";

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
    ".gallery", templateSelector
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
    const card = new Card(data, cardSelector, handleClickLikeButton, handleDeleteCard, handleImage);
    const newCardElement = card.createCard();
    sectionCards.addItem(newCardElement);
}

//popupwithform 1) avatar

const submitAvatarHandler = (inputValues) => {
    onLoading(true, popupAvatarClass.submitButton);
    api.updateAvatar(inputValues.avatar_link)
        .then(() => {
            userInfo.getUserAvatar(inputValues.avatar_link);
            popupAvatarClass.close();
        })
        .catch((err) => alert(err))
        .finally(() => onLoading(false, popupAvatarClass.submitButton));
}

const popupAvatarClass = new PopupWithForm(
    ".popup_avatar",
    submitAvatarHandler
)
popupAvatarClass.setEventListeners();
const popupAvatarValidator = new FormValidator(object, popupAvatar);
profileAvatar.addEventListener("click", () => {
    popupAvatarClass.open();
    popupAvatarValidator.enableValidation();
})





//2) editProfile
const submitEditHandler = (inputValues) => {
    onLoading(true, editInfoPopup.submitButton);
    api.updateProfileInfo(inputValues.user_name, inputValues.user_occupation)
        .then(() => {
            userInfo.getUserInfo(inputValues.user_name, inputValues.user_occupation);
            editInfoPopup.close();
        })
        .catch((err) => alert(err))
        .finally(() => onLoading(false, editInfoPopup.submitButton));
}


const editInfoPopup = new PopupWithForm(
    ".popup_edit",
    submitEditHandler
)
editInfoPopup.setEventListeners();

const editInfoValidator = new FormValidator(object, popupEdit);
profileEditButton.addEventListener("click", () => {
    editInfoPopup.open();
    profileNameInput.value = profileName.textContent;
    profileOccupationInput.value = profileOccupation.textContent;
    editInfoValidator.enableValidation();
})





// 3) new card popup

const submitAddHandler = (inputValues) => {
    onLoading(true, addCardPopup.submitButton);
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
        .finally(() => onLoading(false, addCardPopup.submitButton));
}


const addCardPopup = new PopupWithForm(
    ".popup_image",
    submitAddHandler
)
addCardPopup.setEventListeners();
const addCardValidator = new FormValidator(object, popupImage);
addButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardValidator.enableValidation();
})




export {userId}