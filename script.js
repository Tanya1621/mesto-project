const popupEdit = document.querySelector(".popup_edit");
const popupImage = document.querySelector(".popup_image");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__close-icon");
const addButton = document.querySelector(".profile__add-button");
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
const profileName = document.querySelector(".profile__name");
const profileOccupaton = document.querySelector(".profile__occupation");


// открытие попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
// открытие попап c редактированием
profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
  initInfo();
});

//открытие попап добавления картинки
addButton.addEventListener("click", function () {
  openPopup(popupImage);
});

// закрытие попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeButtons.forEach(function (cl) {
  cl.addEventListener("click", function () {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup); 
  });
});

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

formElement.addEventListener("submit", editProfileInfo);

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

// Добавление карточек
function initCard(image, title) {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__element")
    .cloneNode(true);
  galleryElement.querySelector(".gallery__image").src = image;
  galleryElement.querySelector(".gallery__title").textContent = title;
  const heart = galleryElement.querySelector(".gallery__like");
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
  openFullsreen(galleryElement);
  // добавление карточки в галерею
  gallery.append(galleryElement);
}

//  создание карточки
function createCard(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  initCard(link, name);
  placeNameInput.value = "";
  placeLinkInput.value = "";
  closePopup(popupImage);
}

formElementImage.addEventListener("submit", createCard);

initialCards.forEach((element) => {
  initCard(element.link, element.name);
});
