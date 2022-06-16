import {
    avatar,
    editAvatarSubmitButton,
    editProfileInfoSubmitButton,
    jobInput,
    nameInput,
    object,
    popupAvatar,
    popupEdit,
    profileName,
    profileOccupaton,
    avatarInput
} from "./vars.js";
import {deleteLikeFromServer, sendLikeToServer, updateAvatar, updateProfileInfo} from "./api";


//закрытие на Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}


// открытие попап
function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEsc);

}


// закрытие попап
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEsc);
}


// установка начальных данных в попапе для редактирования профиля
function initInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupaton.textContent;
}

// обновление информации в профиле
function editProfileInfo(evt) {
    evt.preventDefault();
    onLoading(true, editProfileInfoSubmitButton);
    profileName.textContent = nameInput.value;
    profileOccupaton.textContent = jobInput.value;
    updateProfileInfo(nameInput.value, jobInput.value, editProfileInfoSubmitButton);
    closePopup(popupEdit);
}

// блокировка кнопки
function inactivateButton(popup) {
    const sendButton = popup.querySelector('.popup__send');
    sendButton.classList.add(object.inactiveButtonClass);
    sendButton.disabled = true;
}


//функция изменения картинки


const editAvatar = (evt) => {
    evt.preventDefault();
    const imageLink = avatarInput.value;
    avatar.src = imageLink;
    onLoading(true, editAvatarSubmitButton);
    updateAvatar(imageLink, editAvatarSubmitButton);
    closePopup(popupAvatar);
    avatarInput.value = '';
}

const toggleLike = (like, cardId, likeCounter) => {
    if (like.classList.contains('gallery__like_active')) {
        sendLikeToServer(cardId, likeCounter);
    } else {
        deleteLikeFromServer(cardId, likeCounter);
    }
}


const onLoading = (status, button) => {
    if (status) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранение'
    }
}

export {
    closePopup, initInfo, editProfileInfo, openPopup, inactivateButton, toggleLike, onLoading, editAvatar
}
