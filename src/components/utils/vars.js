const popupEdit = document.querySelector(".popup_edit");
const popupImage = document.querySelector(".popup_image");
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector('.profile__edit-avatar');
const popupAvatar = document.querySelector('.popup_avatar');
const profileNameInput = document.querySelector('.popup__field_value_name');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const profileOccupationInput = document.querySelector('.popup__field_value_occupation');
const object = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__send',
    inactiveButtonClass: 'popup__send_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__input-error_active'
};
const templateSelector = '#gallery-item';
export {
    popupEdit,
    popupImage,
    profileEditButton,
    addButton,
    object,
    profileAvatar,
    popupAvatar,
    templateSelector, profileNameInput, profileName, profileOccupationInput, profileOccupation
}
