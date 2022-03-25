let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let close = document.querySelector('.popup__close-icon');
// открытие попап
function openPopup() {
    popup.classList.add('popup_opened');
}
edit.addEventListener('click', openPopup);

// закрытие попап
function closePopup() {
    popup.classList.remove('popup_opened');
}
close.addEventListener('click', closePopup);

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
