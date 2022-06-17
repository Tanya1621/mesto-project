import {
    avatar,
    editAvatarSubmitButton,
    editProfileInfoSubmitButton,
    jobInput,
    nameInput,
    popupAvatar,
    popupEdit,
    profileName,
    profileOccupation,
    avatarInput, avatarFormElement
} from "./vars.js";
import {updateAvatar, updateProfileInfo} from "./api.js";
import {inactivateButton, onLoading} from "./utils.js";


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
    jobInput.value = profileOccupation.textContent;
}

// обновление информации в профиле
function editProfileInfo(evt) {
    evt.preventDefault();
    onLoading(true, editProfileInfoSubmitButton);
    updateProfileInfo(nameInput.value, jobInput.value)
        .then(() => {
            profileName.textContent = nameInput.value;
            profileOccupation.textContent = jobInput.value;
            inactivateButton(popupEdit);
            closePopup(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, editProfileInfoSubmitButton)
        })
}


//функция изменения картинки


const editAvatar = (evt) => {
    evt.preventDefault();
    const imageLink = avatarInput.value;
    onLoading(true, editAvatarSubmitButton);
    updateAvatar(imageLink)
        .then(() => {
            avatar.src = imageLink;
            inactivateButton(popupAvatar);
            closePopup(popupAvatar);
            avatarFormElement.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            onLoading(false, editAvatarSubmitButton)
        })
}


export {
    closePopup, initInfo, editProfileInfo, openPopup, onLoading, editAvatar
}
