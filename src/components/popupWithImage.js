import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
    open(picture, title) {
        const popupImage = this._popup.querySelector(".popup_fullscreen__image");
        popupImage.src = picture.src;
        popupImage.alt = picture.alt;
        this._popup.querySelector(".popup_fullscreen__image-capture").textContent = title;
        super.open();
    }
}