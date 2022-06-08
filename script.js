const popupEdit = document.querySelector(".popup_edit");
const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector(".popup_image");
const edit = document.querySelector(".profile__edit-button");
const close = document.querySelectorAll(".popup__close-icon");
const add = document.querySelector(".profile__add-button");
const popupFullscreen = document.querySelector(".popup_fullscreen");

const popupFullscreenCap = document.querySelector(
  ".popup_fullscreen__image-capture"
);
const FullscreenImage = document.querySelector(".popup_fullscreen__image");
const placeNameInput = document.querySelector(".popup__field_value_place-name");
const placeLinkInput = document.querySelector(".popup__field_value_place-link");
const formElementImage = document.querySelector(".popup-image__form");
const galleryTemplate = document.querySelector("#gallery-item").content;

const gallery = document.querySelector(".gallery");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__field_value_name");
const jobInput = document.querySelector(".popup__field_value_occupation");
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");


popups.forEach ((popup) => {
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popup.classList.remove("popup_opened");
    }
  });
  window.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') && popup.classList.contains('popup_opened')) {
      popup.classList.remove("popup_opened");
    }
  })
})

// открытие попап c редактированием

function openPopup() {
  popupEdit.classList.add("popup_opened");
}
edit.addEventListener("click", openPopup);

//открытие попап добавления картинки
function openPopupImage() {
  popupImage.classList.add("popup_opened");
}
add.addEventListener("click", openPopupImage);

// закрытие попап
function closePopup() {
  popupEdit.classList.remove("popup_opened");
}

function closePopupImage() {
  popupImage.classList.remove("popup_opened");
}
function closePopupFullscreen() {
  popupFullscreen.classList.remove("popup_opened");
}

close.forEach(function (cl) {
  cl.addEventListener("click", closePopup);
  cl.addEventListener("click", closePopupFullscreen);
  cl.addEventListener("click", closePopupImage);
});

// установка начальных данных в попапе для редактирования профиля
function initInfo() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}
initInfo();

// обновление информации в профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

// функция для открытия попап с картинкой


function openFullscreen(element) {
  const galleryImage = element.querySelector(".gallery__image");
  galleryImage.addEventListener("click", function () {
    popupFullscreen.classList.add("popup_opened");
    const galleryTitle = element.querySelector(".gallery__title").textContent;
    FullscreenImage.src = galleryImage.src;
    popupFullscreenCap.textContent = galleryTitle;
  });
}

// Добавление карточек

const initialCards = [
  {
    name: "Шихан Куштау",
    link: "./images/kushtau.png",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/elbrus.jpeg",
  },
  {
    name: "Озеро Байкал",
    link: "./images/baikal-2.jpeg",
  },
  {
    name: "Город Калининград",
    link: "./images/kaliningrad.jpeg",
  },
  {
    name: "Город Санкт-Петербург",
    link: "./images/spb2.jpeg",
  },
  {
    name: "Город Казань",
    link: "./images/kazan.jpeg",
  },
];

function initCard(image, title) {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__element")
    .cloneNode(true);
  galleryElement.querySelector(".gallery__image").src = image;
  galleryElement.querySelector(".gallery__title").textContent = title;
  let heart = galleryElement.querySelector(".gallery__like");
  // добавление лайков
  heart.addEventListener("click", function () {
    heart.classList.toggle("gallery__like_active");
  });
  // удаление карточки
  const deleteButton = galleryElement.querySelector(".gallery__delete");
  deleteButton.addEventListener("click", function () {
    galleryElement.remove();
  });
  // открытие попапа с изображением
  openFullscreen(galleryElement);
  // добавление карточки в галерею
  gallery.append(galleryElement);
}

//  создание карточки
function createCard(evt) {
  evt.preventDefault();
  let name = placeNameInput.value;
  let link = placeLinkInput.value;
  initialCards.push({
    name: name,
    link: link,
  });
  initCard(link, name);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  closePopupImage();
}

formElementImage.addEventListener("submit", createCard);

// инициализация карт
for (let i = 0; i < initialCards.length; i++) {
  initCard(initialCards[i].link, initialCards[i].name);
}

//закрытие попапа на esc


//Form validation


const showError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
  inputElement.classList.add(object.inputErrorClass);

}

const hasInvalidInput = (inputList) => {
  return inputList.some(function(element) {
    return !element.validity.valid;
})}

  const toggleButtonState = (inputList, buttonElement, object) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(object.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

const hideError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
}


const checkInputValidity = (formElement, inputElement, object) => {
  if(inputElement.validity.valid) {
    hideError(formElement, inputElement, object);
  }
  else{
    showError(formElement, inputElement, inputElement.validationMessage, object);
  }
}


function setEventListeners(formElement, object) {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, object);
  inputList.forEach ((inputElement)=> {
    inputElement.addEventListener('input', ()=> {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    })
  })
}


function enableValidation (object) {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement)=> {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    })
    setEventListeners(formElement, object);
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__send',
  inactiveButtonClass: 'popup__send_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
});