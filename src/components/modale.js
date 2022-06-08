import {
    nameInput,
    jobInput,
    profileName,
    profileOccupaton,
    popupEdit,
    FullscreenImage,
    popupFullscreen,
    popupFullscreenCap
} from "./vars.js";


// открытие попап
function openPopup(popup) {
    popup.classList.add("popup_opened");
}


// закрытие попап
function closePopup(popup) {
    popup.classList.remove("popup_opened");
}


// установка начальных данных в попапе для редактирования профиля
function initInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupaton.textContent;
}

// обновление информации в профиле
function editProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileOccupaton.textContent = jobInput.value;
    closePopup(popupEdit);
}


// функция для открытия попап с картинкой

function openFullsreen(element) {
    const galleryImage = element.querySelector(".gallery__image");
    galleryImage.addEventListener("click", function () {
        openPopup(popupFullscreen);
        const galleryTitle = element.querySelector(".gallery__title").textContent;
        FullscreenImage.src = galleryImage.src;
        FullscreenImage.alt = galleryImage.alt;
        popupFullscreenCap.textContent = galleryTitle;
    });
}

export {openFullsreen, closePopup, initInfo, editProfileInfo, openPopup}