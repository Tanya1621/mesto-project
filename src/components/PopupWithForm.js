import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll(".popup__field");
        this.submitButton = this._popup.querySelector(".popup__send");

    }

    setInputValues(values) {
        this._inputValues = values;
        this._inputList.forEach((input) => {
            input.value = this._inputValues[input.name];
        });
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(inputElement => {
            this._inputValues[inputElement.name] = inputElement.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitFormHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

}