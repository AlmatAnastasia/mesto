export default class Popup { // класс Popup, который отвечает за открытие и закрытие попапа

    // конструктор принимает один параметр — селектор попапа
    constructor(popupSelector) {
        // приватные поля (переменные с this) экземпляра класса Popup
        this._popup = document.querySelector(popupSelector);
        this._openSelector = 'popup_opened';
    }

    // приватные методы
    _handleEscClose() { // закрыть попап клавишей Esc (обработчик нажатия на клавишу Esc)
        return (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            };
        }
    }

    _closePopupClick(object, func, universalСlass) { // закрыть попап при нажатии (на кнопку или overlay)
        if (object.classList.contains(universalСlass)) {
            this.close();
            func();
        };
    }

    _handlePopupClick(func) { // обработчик нажатия на попап
        return (evt) => {
            const object = evt.target;
            this._closePopupClick(object, func, 'popup_opened'); // закрыть попап при нажатии на overlay
            this._closePopupClick(object, func, 'popup__close-button'); // закрыть попап при нажатии на кнопку
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

    setEventListeners(func = function () { }) { // добавить слушатель клика иконке закрытия попапа
        this._popup.addEventListener('click', this._handlePopupClick(func)); // прикрепить обработчик нажатия на попап
    }
}