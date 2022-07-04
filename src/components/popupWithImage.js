import Popup from "./popup";
export default class popupWithImage extends Popup {
    open(picture) {
        const popupImage = this.popup.querySelector(".gallery__image");
        popupImage.src = picture.src;
        popupImage.alt = picture.alt;
        this.popup.querySelector(".gallery__title").textContent = picture.title;
        super.open();
    }
}