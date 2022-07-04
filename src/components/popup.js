
export default class Popup {
    constructor(popupSelector, closeBtn) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(closeBtn);
        this._handleClickEscCloseButton = this._handleClickEsc.bind(this);
    }
    _handleClickEsc(evt) {
        if (evt.key === "Escape") this.close();
    }
    _handleClickOverlay(evt) {
        if (evt.target === evt.currentTarget) this.close();
    }
    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {this._handleClickOverlay(evt);});
        this._closeButton.addEventListener("click", () => {this.close();});
    }
    close() {
        this.popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleClickEsc);
    }
    open() {
        this.popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleClickEsc);
    }
}