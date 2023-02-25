import Popup from "./Popup.js";

export default class PopupWithForm extends Popup { // класс PopupWithForm, который совмещает работу с попапом и формой (перезаписывает родительские методы setEventListeners, close)

    // конструктор принимает два параметра — селектор попапа и колбэк сабмита формы
    constructor(popupSelector, handleFormSubmit, popupFormValidators) {
        super(popupSelector); // наследование от Popup
        // приватные поля (переменные с this) экземпляра класса PopupWithForm
        this._handleFormSubmit = handleFormSubmit;
        this._popupFormValidators = popupFormValidators;
        this._popupValues = {}; // пустой объект для значений полей
        this._popupInputList = this._popup.querySelectorAll('.popup__input'); // все элементы полей
        this._popupForm = this._popup.querySelector('.popup__form');
        this._close = this.close.bind(this);
        this._submitHandler = this._getInputValues.bind(this);
    }

    // приватный метод
    _getInputValues() { // собрать данные всех полей формы
        this._popupInputList.forEach(input => { // добавить в пустой объект значения всех полей
            this._popupValues[input.name] = input.value;
        });

        return this._popupValues;
    }

    // публичные методы, перезапись родительских методов

    close() {
        super.close(); // наследование от Popup
        this._popupForm.reset(); // очистить форму попапа
        // вызвать метод resetValidation экземпляра класса под именем формы
        this._popupFormValidators[this._popupForm.name].resetValidation(); // сбросить проверку
    }

    setEventListeners() {
        const close = this._close;
        const submitHandler = this._submitHandler;
        super.setEventListeners(); // наследование от Popup
        // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка» 
        this._popup.addEventListener('submit', this._handleFormSubmit({ close, submitHandler }));
    }
}