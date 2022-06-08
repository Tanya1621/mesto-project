import {galleryTemplate, gallery, placeNameInput, placeLinkInput, popupImage} from "./vars.js";
import {closePopup, openFullsreen} from "./modale.js";

// Добавление карточек
function initCard(image, title) {
    const galleryElement = galleryTemplate
        .querySelector(".gallery__element")
        .cloneNode(true);
    galleryElement.querySelector(".gallery__image").src = image;
    galleryElement.querySelector(".gallery__title").textContent = title;
    const heart = galleryElement.querySelector(".gallery__like");
    // добавление лайков
    heart.addEventListener("click", function () {
        heart.classList.toggle("gallery__like_active");
    });
    // удаление карточки
    const deleteButton = galleryElement.querySelector(".gallery__delete");
    deleteButton.addEventListener("click", function () {
        galleryElement.remove();
    });
    // открытие попапа с изображением
    openFullsreen(galleryElement);
    // добавление карточки в галерею
    gallery.append(galleryElement);
}

//  создание карточки
function createCard(evt) {
    evt.preventDefault();
    const name = placeNameInput.value;
    const link = placeLinkInput.value;
    initCard(link, name);
    placeNameInput.value = "";
    placeLinkInput.value = "";
    closePopup(popupImage);
}

export {createCard, initCard}