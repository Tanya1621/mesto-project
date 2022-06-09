import {jobInput, nameInput, popupEdit, profileName, profileOccupaton} from "./vars.js";

//закрытие на Esc
function closeByEsc(evt) {
    if(evt.key === 'Escape'){
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
    profileName.textContent = nameInput.value;
    profileOccupaton.textContent = jobInput.value;
    closePopup(popupEdit);
}


export {closePopup, initInfo, editProfileInfo, openPopup}