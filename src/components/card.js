import {
    fullscreenImage,
    gallery,
    galleryTemplate,
    object,
    placeLinkInput,
    placeNameInput,
    popupFullscreen,
    popupFullscreenCap,
    popupImage
} from "./vars.js";
import {closePopup, openPopup} from "./modale.js";
import {enableValidation} from "./validate";

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

function createCard(image, title) {
    const galleryElement = galleryTemplate
        .querySelector(".gallery__element")
        .cloneNode(true);
    galleryElement.querySelector(".gallery__image").src = image;
    galleryElement.querySelector(".gallery__title").textContent = title;
    galleryElement.querySelector(".gallery__image").alt = title;
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
    setImageHandler(galleryElement);
    return galleryElement;
}
// Добавление карточек
function prependCard(image, title) {
   const galleryElement = createCard(image, title);
    gallery.prepend(galleryElement);
}

//  создание карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const name = placeNameInput.value;
    const link = placeLinkInput.value;
    prependCard(link, name);
    evt.target.reset();
    closePopup(popupImage);
    enableValidation(object);
}



export {handleCardFormSubmit, prependCard}
export {setImageHandler};