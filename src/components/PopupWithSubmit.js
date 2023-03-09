import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup { // класс PopupWithForm, который подтверждает удаление карточки

    // конструктор принимает один параметр — селектор попапа 
    constructor(popupSelector) {
        super(popupSelector); // наследование от Popup
    }

    // публичные методы, наследование
    open(functionDeleteCard, card, cardID) {
        super.open(); // наследование от Popup
        this._functionDeleteCard = functionDeleteCard; // обработчик удаления карточки
        this._card = card;
        this._cardID = cardID;
    }

    setEventListeners() { // добавить слушатель клика иконке закрытия попапа
        super.setEventListeners(); // наследование от Popup
        this._popup.addEventListener('submit', (evt) => { // обработчик события "submit"
            evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
            this._functionDeleteCard(this._card, this._cardID);
        });
    }
};