// блокировка кнопки
import {object} from "./vars.js";

export function inactivateButton(popup) {
    const sendButton = popup.querySelector('.popup__send');
    sendButton.classList.add(object.inactiveButtonClass);
    sendButton.disabled = true;
}

//кнопка сохранить при загрузке
export const onLoading = (status, button) => {
    if (status) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранение'
    }
}