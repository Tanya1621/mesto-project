const showError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
    inputElement.classList.add(object.inputErrorClass);

}

const hasInvalidInput = (inputList) => {
    return inputList.some(function (element) {
        return !element.validity.valid;
    })
}


const toggleButtonState = (inputList, buttonElement, object) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(object.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(object.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

const hideError = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
}


const checkInputValidity = (formElement, inputElement, object) => {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, object);
    } else {
        showError(formElement, inputElement, inputElement.validationMessage, object);
    }
}


function setEventListeners(formElement, object) {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, object);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, object);
            toggleButtonState(inputList, buttonElement, object);
        })
    })
}


function enableValidation(object) {
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement, object);
    })
}

export {enableValidation};