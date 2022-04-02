const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup_image");
const edit = document.querySelector(".profile__edit-button");
const close = document.querySelectorAll(".popup__close-icon");
const add = document.querySelector(".profile__add-button");
const popupFullscreen = document.querySelector(".popup_fullscreen");
const galleryItem = document.querySelectorAll(".gallery__element");
const popupFullscreenCap = document.querySelector(
  ".popup_fullscreen__image-capture"
);
const FullscreenImage = document.querySelector(".popup_fullscreen__image");
const placeNameInput = document.querySelector(".popup__field_value_place-name");
const placeLinkInput = document.querySelector(".popup__field_value_place-link");
const formElementImage = document.querySelector(".popup-image__form");
const galleryTemplate = document.querySelector("#gallery-item").content;
const galleryElement = galleryTemplate
  .querySelector(".gallery__element")
  .cloneNode(true);
const gallery = document.querySelector(".gallery");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__field_value_name");
const jobInput = document.querySelector(".popup__field_value_occupation");
let profileName = document.querySelector(".profile__name");
let profileOccupaton = document.querySelector(".profile__occupation");

// открытие попап

function openPopup() {
  popup.classList.add("popup_opened");
}
edit.addEventListener("click", openPopup);

//image
function openPopupImage() {
  popupImage.classList.add("popup_opened");
}
add.addEventListener("click", openPopupImage);

// закрытие попап
function closePopup() {
  popup.classList.remove("popup_opened");
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

// обновление информации в профиле
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupaton.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

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

  openFullsreen(galleryElement);
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

// открытие попап с картинкой

function openFullsreen(element) {
  const galleryImage = element.querySelector(".gallery__image");
  galleryImage.addEventListener("click", function () {
    popupFullscreen.classList.add("popup_opened");
    const galleryTitle = element.querySelector(".gallery__title").textContent;
    FullscreenImage.src = galleryImage.src;
    popupFullscreenCap.textContent = galleryTitle;
  });
}
