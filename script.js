let popup = document.querySelector('.popup');
let popupImage = document.querySelector('.popup-image');
let edit = document.querySelector('.profile__edit-button');
let close = document.querySelector('.popup__close-icon');
let closeImage = document.querySelector('.popup-image__close-icon');
const add = document.querySelector('.profile__add-button');
// открытие попап
function openPopup() {
    popup.classList.add('popup_opened');
}
edit.addEventListener('click', openPopup);

//image
function openPopupImage() {
    popupImage.classList.add('popup_opened');
}
add.addEventListener('click', openPopupImage);




// закрытие попап
function closePopup() {
    popup.classList.remove('popup_opened');
}

function closePopupImage() {
    popupImage.classList.remove('popup_opened');
}
close.addEventListener('click', closePopup);
closeImage.addEventListener('click', closePopupImage);




// обновление информации в профиле
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field_value_name');
const jobInput = document.querySelector('.popup__field_value_occupation');
let profileName = document.querySelector('.profile__name');
let profileOccupaton = document.querySelector('.profile__occupation');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileOccupaton.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// Лайк карточек

let heart = document.querySelector('.gallery__like');

function like() {
    heart.classList.toggle('gallery__like_active');
}

heart.addEventListener('click', like);
