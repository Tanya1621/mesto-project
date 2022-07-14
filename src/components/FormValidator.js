export default class FormValidator {
    constructor(object, formElement) {
        this._submitButton = formElement.querySelector(object.submitButtonSelector);
        this._formElement = formElement;
        this._errorClass = object.errorClass;
        this._inputErrorClass = object.inputErrorClass;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    }

    _showError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideError(inputElement);
        } else {
            this._showError(inputElement, inputElement.validationMessage);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some(function (element) {
            return !element.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }


    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
    }



    enableValidation() {
        this._setEventListeners();
    }
}