import Popup from "./Popup.js";

export default class PopupWithForm extends Popup { // класс PopupWithForm, который совмещает работу с попапом и формой (перезаписывает родительские методы setEventListeners, close)

    // конструктор принимает два параметра — селектор попапа и колбэк сабмита формы
    constructor(popupSelector, handleFormSubmit, setInfo, { clearPopup }) {
        super(popupSelector); // наследование от Popup
        // приватные поля (переменные с this) экземпляра класса PopupWithForm
        this._popup = document.querySelector(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._setInfo = setInfo;
        this._clearPopup = clearPopup;
        this._nameInputSelector = '.popup__input_type_name-text';
        this._linkInputSelector = '.popup__input_type_description-url';
    }

    // приватный метод
    _getInputValues() { // собрать данные всех полей формы
        const name = this._popup.querySelector(this._nameInputSelector).value;
        const link = this._popup.querySelector(this._linkInputSelector).value;
        return { name, link };
    }

    // публичные методы, перезапись родительских методов
    close() {
        super.close(); // наследование от Popup
        this._clearPopup();
    }

    setEventListeners() {
        const close = this.close.bind(this);
        let setInfo = this._setInfo;
        if (setInfo === null) {
            setInfo = this._getInputValues.bind(this);
        };
        super.setEventListeners(); // наследование от Popup
        // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка» 
        this._popup.addEventListener('submit', this._handleFormSubmit({ close, setInfo }));
    }
}