export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-icon');
        this._handleClickEscBinded = this._handleClickEsc.bind(this);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleClickEscBinded);
    }

    _handleClickEsc(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleClickEscBinded);
    }

    _handleClickOverlay(evt) {
        if (evt.target === evt.currentTarget) this.close();
    }

    setEventListeners() {
        this._popup.addEventListener("mousedown", (evt) => {
            this._handleClickOverlay(evt);
        });
        this._closeButton.addEventListener("click", () => {
            this.close();
        });
    }
}