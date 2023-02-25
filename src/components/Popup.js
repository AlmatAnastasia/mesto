export default class Popup { // класс Popup, который отвечает за открытие и закрытие попапа

    // конструктор принимает один параметр — селектор попапа
    constructor(popupSelector) {
        // приватные поля (переменные с this) экземпляра класса Popup
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this); // привязать функцию методом bind (постоянная ссылка для обработчика)
        this._openSelector = 'popup_opened';
        this._closeButtonSelector = 'popup__close-button';
    }

    // приватные методы
    _handleEscClose(evt) { // закрыть попап клавишей Esc (обработчик нажатия на клавишу Esc)
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _closePopupClick(object, funcClearData, universalСlass) { // закрыть попап при нажатии (на кнопку или overlay)
        if (object.classList.contains(universalСlass)) {
            this.close();
            funcClearData(); // очистить данные попапа (image)
        };
    }

    _handlePopupClick(funcClearData) { // обработчик нажатия на попап
        return (evt) => {
            const object = evt.target;
            this._closePopupClick(object, funcClearData, this._openSelector); // закрыть попап при нажатии на overlay
            this._closePopupClick(object, funcClearData, this._closeButtonSelector); // закрыть попап при нажатии на кнопку
        }
    };

    // публичные методы
    open() { // открыть попап
        this._popup.classList.add(this._openSelector);
        document.addEventListener('keyup', this._handleEscClose); // прикрепить обработчик нажатия на клавишу Esc
    }

    close() { // закрыть попап
        this._popup.classList.remove(this._openSelector);
        document.removeEventListener('keyup', this._handleEscClose); // удалить обработчик события keyup
    }

    setEventListeners(funcClearData = function () { }) { // добавить слушатель клика иконке закрытия попапа
        this._popup.addEventListener('click', this._handlePopupClick(funcClearData)); // прикрепить обработчик нажатия на попап
    }
}