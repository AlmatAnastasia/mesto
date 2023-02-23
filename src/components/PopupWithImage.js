import Popup from "./Popup.js";

export default class PopupWithImage extends Popup { // класс PopupWithImage, который вставляет в попап картинку с src изображения и подписью к картинке

    constructor(popupSelector, { popupImagePhotoSelector, popupImageHeadingSelector }, card = null, cardImage = null, titleSelector = null) {
        super(popupSelector); // наследование от Popup
        // приватные поля (переменные с this) экземпляра класса PopupWithImage
        this._popup = document.querySelector(popupSelector);
        this._popupImagePhoto = this._popup.querySelector(popupImagePhotoSelector);
        this._popupImageHeading = this._popup.querySelector(popupImageHeadingSelector);
        this._card = card;
        this._cardImage = cardImage;
        this._titleSelector = titleSelector;
        this._func = this._clearDataPopupImage;
    }

    // приватный метод
    _addPreviewInfo() { // добавить изображение и заголовок попапу (image)
        // Объект настроек popups (image) - глобальня переменная
        this._cardHeading = this._card.querySelector(this._titleSelector);
        this._popupImagePhoto.alt = this._cardImage.alt;
        this._popupImagePhoto.src = this._cardImage.src;
        this._popupImageHeading.textContent = this._cardHeading.textContent;
    }

    _clearDataPopupImage() { // очистить данные попапа (image)
        this._popupImagePhoto.alt = '';
        this._popupImagePhoto.src = '';
        this._popupImageHeading.textContent = '';
    };

    // публичные методы, перезапись родительских методов
    open() { // вставить в попап картинку (src, alt)
        super.open(); // наследование от Popup
        this._addPreviewInfo(); // добавить изображение и заголовок
    }

    setEventListeners() { // добавить слушатель клика иконке закрытия попапа
        const func = this._clearDataPopupImage.bind(this);
        super.setEventListeners(func); // наследование от Popup
    }
}