class Card{
    constructor(data, templateSelector, cardSelector) {
    //    принять данные
        this._template = cardSelector;
        this._likes = data.likes;
        this._title = data.title;
        this._image = data.image;
        this._link = data.link;
        this._owner = data.owner;

    //   принять селектор
    }
    //создать приватные методы для работы с разметкой и слушателей
    _getElement {
        const newCard = document.querySelector(templateSelector).content.querySelector(cardSelector).cloneNode(true);
        return newCard;
}
_setEventListeners

    //создать приватные методы для обработчиков

    //публичный методв возвращающий готовую карточку
    createCard(){

    }
}

//создать для каждой карточки новый экземпляр класса