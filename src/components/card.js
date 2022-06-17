import {
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
import {addCardToServer, deleteCardFromServer, deleteLikeFromServer, sendLikeToServer} from "./api.js";
import {userId} from "../index.js";
import {inactivateButton} from "./utils.js";

//функция снятия и добавления лайка
const toggleLike = (like, cardId, likeCounter) => {
    if (!like.classList.contains('gallery__like_active')) {
        sendLikeToServer(cardId)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
                like.classList.toggle("gallery__like_active");
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        deleteLikeFromServer(cardId)
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
            deleteCardFromServer(cardId)
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
    addCardToServer(name, link)
        .then((res) => {
            evt.target.reset();
            closePopup(popupImage);
            inactivateButton(popupImage);
            renderCard(link, name, res._id, res.owner, res.likes)
        })

        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, addCardSubmitButton);
        })

}


export {handleCardFormSubmit, renderCard, createCard, toggleLike}
export {setImageHandler};