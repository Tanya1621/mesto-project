// блокировка кнопки
import {object} from "./vars.js";

//кнопка сохранить при загрузке
export const onLoading = (status, button) => {
    if (status) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}