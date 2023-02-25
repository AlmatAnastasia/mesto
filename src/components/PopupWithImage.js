import Popup from "./Popup.js";

export default class PopupWithImage extends Popup { // класс PopupWithImage, который вставляет в попап картинку с src изображения и подписью к картинке

    constructor(popupSelector, { popupImagePhotoSelector, popupImageHeadingSelector }) {
        super(popupSelector); // наследование от Popup
        // приватные поля (переменные с this) экземпляра класса PopupWithImage
        this._popupImagePhoto = this._popup.querySelector(popupImagePhotoSelector);
        this._popupImageHeading = this._popup.querySelector(popupImageHeadingSelector);
        this._funcClearData = this._clearDataPopupImage.bind(this);
    }

    // приватный метод
    _addPreviewInfo() { // добавить изображение и заголовок попапу (image)
        // Объект настроек popups (image) - глобальня переменная
        this._popupImageHeading.textContent = this._name;
        this._popupImagePhoto.src = this._link;
        this._popupImagePhoto.alt = this._description;
    }

    _clearDataPopupImage() { // очистить данные попапа (image)
        this._popupImagePhoto.alt = '';
        this._popupImagePhoto.src = '';
        this._popupImageHeading.textContent = '';
    };

    // публичные методы, перезапись родительских методов
    open(name, link, description) { // вставить в попап картинку (textContent, src, alt)
        this._name = name;
        this._link = link;
        this._description = description;
        super.open(); // наследование от Popup
        this._addPreviewInfo(); // добавить изображение и заголовок
    }

    setEventListeners() { // добавить слушатель клика иконке закрытия попапа
        super.setEventListeners(this._funcClearData); // наследование от Popup
    }
}