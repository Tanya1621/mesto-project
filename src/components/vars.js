const kushtauImage = new URL('../images/kushtau.png', import.meta.url);
const elbrusImage = new URL('../images/elbrus.jpeg', import.meta.url);
const baicalImage = new URL('../images/baikal-2.jpeg', import.meta.url);
const kalinngradImage = new URL('../images/kaliningrad.jpeg', import.meta.url);
const spbImage = new URL('../images/spb2.jpeg', import.meta.url);
const kazanImage = new URL('../images/kazan.jpeg', import.meta.url);



const initialCards = [{
    name: "Шихан Куштау", link: kushtauImage,
}, {
    name: "Гора Эльбрус", link: elbrusImage,
}, {
    name: "Озеро Байкал", link: baicalImage,
}, {
    name: "Город Калининград", link: kalinngradImage,
}, {
    name: "Город Санкт-Петербург", link: spbImage,
}, {
    name: "Город Казань", link: kazanImage,
},];

const popupEdit = document.querySelector(".popup_edit");
const popupImage = document.querySelector(".popup_image");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupFullscreen = document.querySelector(".popup_fullscreen");
const popupFullscreenCap = document.querySelector(".popup_fullscreen__image-capture");
const fullscreenImage = document.querySelector(".popup_fullscreen__image");
const placeNameInput = document.querySelector(".popup__field_value_place-name");
const placeLinkInput = document.querySelector(".popup__field_value_place-link");
const formElementImage = document.querySelector(".popup-image__form");
const galleryTemplate = document.querySelector("#gallery-item").content;
const gallery = document.querySelector(".gallery");
const profileFormElement = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__field_value_name");
const jobInput = document.querySelector(".popup__field_value_occupation");
const profileName = document.querySelector(".profile__name");
const profileOccupaton = document.querySelector(".profile__occupation");
const popups = document.querySelectorAll('.popup');
const object = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__send',
    inactiveButtonClass: 'popup__send_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
};
export {
    initialCards,
    popupEdit,
    popupImage,
    profileEditButton,
    addButton,
    popupFullscreen,
    popupFullscreenCap,
    fullscreenImage,
    placeNameInput,
    placeLinkInput,
    galleryTemplate,
    formElementImage,
    gallery,
    profileFormElement,
    nameInput,
    jobInput,
    profileName,
    profileOccupaton,
    popups, object
}