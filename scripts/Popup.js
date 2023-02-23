export default class Popup { // класс Popup, который отвечает за открытие и закрытие попапа

    // конструктор принимает один параметр — селектор попапа
    constructor(popupSelector, data = null) {
        // приватные поля (переменные с this) экземпляра класса Popup
        this._popup = document.querySelector(popupSelector);
        this._openSelector = 'popup_opened';
        this._data = data;
    }

    // приватные методы
    _handleEscClose() { // закрыть попап клавишей Esc (обработчик нажатия на клавишу Esc)
        return (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            };
        }
    }
    _clearDataPopupImage() { // очистить данные попапа (image)
        const { popupImagePhotoSelector, popupImageHeadingSelector } = this._data;
        const popupImagePhoto = this._popup.querySelector(popupImagePhotoSelector);
        const popupImageHeading = this._popup.querySelector(popupImageHeadingSelector);
        popupImagePhoto.alt = '';
        popupImagePhoto.src = '';
        popupImageHeading.textContent = '';
    };

    _closePopupClick(object, haveClass, universalСlass) { // закрыть попап при нажатии (на кнопку или overlay)
        if (object.classList.contains(universalСlass)) {
            this.close();
            if (haveClass) {
                this._clearDataPopupImage(); // очистить данные попапа (image)
            };
        };
    }

    _handlePopupClick() { // обработчик нажатия на попап
        return (evt) => {
            const object = evt.target;
            const haveClass = this._popup.classList.contains('popup_type_image'); // наличие класса
            this._closePopupClick(object, haveClass, 'popup_opened'); // закрыть попап при нажатии на overlay
            this._closePopupClick(object, haveClass, 'popup__close-button'); // закрыть попап при нажатии на кнопку
        }
    };

    // публичные методы
    open() { // открыть попап
        this._popup.classList.add(this._openSelector);
        document.addEventListener('keyup', this._handleEscClose()); // прикрепить обработчик нажатия на клавишу Esc
    }

    close() { // закрыть попап
        this._popup.classList.remove(this._openSelector);
        document.removeEventListener('keyup', this._handleEscClose()); // удалить событие keyup
    }

    setEventListeners() { // добавить слушатель клика иконке закрытия попапа
        this._popup.addEventListener('click', this._handlePopupClick(this.popup)); // прикрепить обработчик нажатия на попап
    }
}