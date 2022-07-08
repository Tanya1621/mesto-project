import {templateSelector} from "./vars";

export default class Section {
    constructor ({items, renderer}, containerSelector, templateSelector) {
        this._renderer = renderer;
        this._items = items;
        this._container = document.querySelector(containerSelector);
        this._templateSelector = templateSelector;
    }
    addItem(element) {
        this._container.prepend(element);
    }
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item, this._templateSelector);
        });
    }
}