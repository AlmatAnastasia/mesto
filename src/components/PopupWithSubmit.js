import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup { // класс PopupWithForm, который подтверждает удаление карточки

    // конструктор принимает один параметр — селектор попапа 
    constructor(popupSelector) {
        super(popupSelector); // наследование от Popup

    }

    // публичные методы, наследование
    open(handlePopupDeleteSubmit, card, cardID) {
        super.open(); // наследование от Popup
        this._handlePopupDeleteSubmit = handlePopupDeleteSubmit; // обработчик удаления карточки
        this._card = card;
        this._cardID = cardID;
    }

    setEventListeners() { // добавить слушатель клика иконке закрытия попапа
        super.setEventListeners(); // наследование от Popup
        this._popup.addEventListener('submit', this._handlePopupDeleteSubmit(this._card, this._cardID)); // прикрепить обработчик события "submit"
    }
};