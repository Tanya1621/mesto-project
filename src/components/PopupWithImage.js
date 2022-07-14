import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup_fullscreen__image");
        this._popupCapture = this._popup.querySelector(".popup_fullscreen__image-capture");

    }
    open(picture, title) {
        this._popupImage.src = picture.src;
        this._popupImage.alt = picture.alt;
        this._popupCapture.textContent = title;
        super.open();
    }
}