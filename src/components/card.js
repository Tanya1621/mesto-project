import {userId} from "../index.js";

export default class Card {
    constructor(data, cardSelector, handleClickLikeButton, handleClickDeleteButton, handleClickPicture) {
        //    принять данные
        this._template = cardSelector;
        this._likes = data.likes;
        this._title = data.name;
        this._isLiked = false;
        this._link = data.link;
        this._owner = data.owner._id;
        this._id = data._id;
        this._handleClickLikeButton = handleClickLikeButton;
        this._handleClickDeleteButton = handleClickDeleteButton;
        this._handleClickPicture = handleClickPicture;
        //   принять селектор
    }

    //создать приватные методы для работы с разметкой и слушателей
    _getElement() {
        const newCard = document.querySelector(this._template).content.querySelector('.gallery__element').cloneNode(true);
        return newCard;
    }

    _checkOwner() {
        return this._owner === userId;
    }


    _setEventListeners() {
        this._picture.addEventListener("click", () => this._handleClickPicture(this._picture, this._title));
        this._likeButton.addEventListener("click", () => this._handleClickLikeButton(this._likeButton, this._id, this._likeCounter));
        if (this._checkOwner()) {
            this._deleteButton.addEventListener("click", () => this._handleClickDeleteButton(this._id, this._element));
        } else {
            this._deleteButton.remove();
        }
    }


    _checkMyLike() {
        this._likes.forEach((element) => {
            if (element._id === userId) {
                this._isLiked = true;
            }
        })
    }

    createCard() {
        this._element = this._getElement();
        this._likeButton = this._element.querySelector(".gallery__like");
        this._likeCounter = this._element.querySelector(".gallery__like-counter");
        this._picture = this._element.querySelector(".gallery__image");
        this._deleteButton = this._element.querySelector(".gallery__delete");
        this._setEventListeners();
        this._likeCounter.textContent = this._likes.length;
        this._element.querySelector(".gallery__image").src = this._link;
        this._element.querySelector(".gallery__title").textContent = this._title;
        this._checkMyLike();
        if (this._isLiked) {
            this._likeButton.classList.add("gallery__like_active");
        }
        return this._element;
    }
}
