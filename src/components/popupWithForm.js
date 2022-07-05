import Popup from "./popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector,submitFormHandler ) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._popupForm = this._popup.querySelector('.popup_edit');
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList= this._popup.querySelectorAll(".popup__input");

    }
    _getInputValues() {
        this._inputValues = {};
    this._inputList.forEach(inputElement => {
    this._inputValues[inputElement.name] = inputElement.value
})
return this._inputValues

}
setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitFormHandler(this._getInputValues());
        });
}
close(){
        super.close();
        this._popupForm.reset();
}
}