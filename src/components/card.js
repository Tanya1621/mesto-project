import {
    addCardSubmitButton,
    fullscreenImage,
    gallery,
    galleryTemplate,
    placeLinkInput,
    placeNameInput,
    popupFullscreen,
    popupFullscreenCap,
    popupImage,
} from "./vars.js";
import {
    closePopup,
    inactivateButton,
    openPopup, toggleLike, onLoading
} from "./module.js";
import {addCardToServer, deleteCardFromServer, getAllCards} from "./api";

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
        if (element._id === '48ba092649dc44ea870652bd') {
            heart.classList.add("gallery__like_active");
        }
    })
    likeCounter.textContent = likes.length;
    heart.addEventListener("click", function () {
        heart.classList.toggle("gallery__like_active");
        toggleLike(heart, cardId, likeCounter);
    });

    // удаление карточки
    const deleteButton = galleryElement.querySelector(".gallery__delete");
    //проверка владельца
    if (owner === '48ba092649dc44ea870652bd') {
        deleteButton.addEventListener("click", function () {
            galleryElement.remove();
            deleteCardFromServer(cardId);
        })
    } else {
        deleteButton.remove();
    }
    // открытие попапа с изображением
    setImageHandler(galleryElement);
    return galleryElement;
}

// Добавление карточек
function prependCard(image, title, cardId, owner, likes) {
    const galleryElement = createCard(image, title, cardId, owner, likes);
    gallery.prepend(galleryElement);
}

//  создание карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    onLoading(true, addCardSubmitButton);
    const name = placeNameInput.value;
    const link = placeLinkInput.value;
    addCardToServer(name, link, addCardSubmitButton);
    evt.target.reset();
    closePopup(popupImage);
    inactivateButton(popupImage);
    getAllCards();
}


export {handleCardFormSubmit, prependCard, createCard}
export {setImageHandler};