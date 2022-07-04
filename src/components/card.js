/*import {
    addCardSubmitButton,
    fullscreenImage,
    gallery,
    galleryTemplate,
    placeLinkInput,
    placeNameInput,
    popupFullscreen,
    popupFullscreenCap,
    popupImage
} from "./vars.js";
import {
    closePopup,
    openPopup, onLoading
} from "./module.js";
import {api, addCardToServer, deleteCardFromServer, deleteLikeFromServer, sendLikeToServer} from "./api.js";
import {inactivateButton} from "./utils.js";*/

import {userId} from "../index.js";

//функция снятия и добавления лайка
/*const toggleLike = (like, cardId, likeCounter) => {
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

// функция для открытия попап с картинкой

function setImageHandler(element) {
    const galleryImage = element.querySelector(".gallery__image");
    galleryImage.addEventListener("click", function () {
        openPopup(popupFullscreen);
        const galleryTitle = element.querySelector(".gallery__title").textContent;
        fullscreenImage.src = galleryImage.src;
        fullscreenImage.alt = galleryImage.alt;
        popupFullscreenCap.textContent = galleryTitle;
    });
}

function createCard(image, title, cardId, owner, likes) {
    const galleryElement = galleryTemplate
        .querySelector(".gallery__element")
        .cloneNode(true);
    const galleryImage = galleryElement.querySelector(".gallery__image");
    galleryImage.src = image;
    galleryElement.querySelector(".gallery__title").textContent = title;
    galleryImage.alt = title;
    const heart = galleryElement.querySelector(".gallery__like");
    // добавление лайков
    const likeCounter = galleryElement.querySelector('.gallery__like-counter');
    likes.forEach((element) => {
        if (element._id === userId) {
            heart.classList.add("gallery__like_active");
        }
    })
    likeCounter.textContent = likes.length;
    heart.addEventListener("click", function () {
        toggleLike(heart, cardId, likeCounter);
    });

    // удаление карточки
    const deleteButton = galleryElement.querySelector(".gallery__delete");
    //проверка владельца
    if (owner === userId) {
        deleteButton.addEventListener("click", function () {
            api.deleteCardFromServer(cardId)
                .then(() => {
                    galleryElement.remove();
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    } else {
        deleteButton.remove();
    }
    // открытие попапа с изображением
    setImageHandler(galleryElement);
    return galleryElement;
}

function prependCard(container, card) {
    container.prepend(card);
}

// Добавление карточек
function renderCard(image, title, cardId, owner, likes) {
    const galleryElement = createCard(image, title, cardId, owner, likes);
    prependCard(gallery, galleryElement);
}


//  создание карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    onLoading(true, addCardSubmitButton);
    const name = placeNameInput.value;
    const link = placeLinkInput.value;
    api.addCardToServer(name, link)
        .then((res) => {
            evt.target.reset();
            closePopup(popupImage);
            inactivateButton(popupImage);
            renderCard(link, name, res._id, res.owner._id, res.likes)
            console.log(res);
        })

        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, addCardSubmitButton);
        })

}


export {handleCardFormSubmit, renderCard, createCard, toggleLike}
export {setImageHandler};*/

export default class Card{
    constructor(data, cardSelector) {
    //    принять данные
        this._template = cardSelector;
        this._likes = data.likes;
        this._title = data.title;
        this._image = data.image;
        this._link = data.link;
        this._owner = data.owner;
        this._handleClickLikeButton = data.handleClickLikeButton;
        this._handleClickDeleteButton = data.handleClickLikeButton;
        this._handleClickPicture = data.handleClickPicture;
    //   принять селектор
    }
    //создать приватные методы для работы с разметкой и слушателей
    _getElement () {
        const newCard = document.querySelector(this._template).content.querySelector(cardSelector).cloneNode(true);
        return newCard;
}

_setEventListeners () {
    this._picture = this._element.querySelector(".gallery__image");
    this._picture.addEventListener("click", () => this._handleClickPicture(this));
    this._likeButton = this._element.querySelector(".gallery__like");
    this.__likeButton.addEventListener("click", () => this._handleClickLikeButton(this));
    this._deleteButton = this._element.querySelector(".gallery__delete");
    if (this._owner === userId) {
        this._deleteButton.addEventListener("click", () => this._handleClickDeleteButton(this));
    }
    else {
        this._deleteButton.remove();
    }
}
    createCard() {
        this._element = this._getElement();
        this._setEventListeners();
        this._element.querySelector(".gallery__like-counter").textContent = this._likes;
        this._element.querySelector(".gallery__image").src = this._link;
        this._element.querySelector(".gallery__title").textContent = this._title;
        if (this._isLiked) {
            this._likeButton.classList.add("gallery__like_active");
        }
    }
}
