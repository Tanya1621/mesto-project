export default class Section {
    constructor (items, renderer, containerSelector) {
        this._renderer = renderer;
        this._items = items;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._container.prepend(element);
    } 
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}