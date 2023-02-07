export class Card { // класс Card, который создаёт карточку с текстом и ссылкой на изображение

    // конструктор принимает данные карточки и селектор template-элемента
    constructor(name, link, templateSelector, settings, handleCardImageClick) { // Инкапсуляция
        this._cardsName = name; // данные карточки
        this._cardsLink = link;
        this._templateSelector = templateSelector; // селектор template-элемента
        this._settings = settings; // Объект настроек для создания карточки
        this._handleCardImageClick = handleCardImageClick;
    }

    // приватные методы для каждого обработчика
    _getTemplate() { // вернуть разметку карточки (клонирование template-элемента)
        const elementCard = document
            .querySelector(this._templateSelector) // селектор template-элемента
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);

        return elementCard;
    }

    _handleLikeButtonClick(evt) { // обработчик лайка карточки
        const likeButton = evt.target;
        likeButton.classList.toggle('card__item-like-button_active'); // лайк карточки
    }

    _handleDeleteButtonClick() { // обработчик удаления карточки
        return () => {
            this._newCard.remove(); // удалить карточку
        };
    }

    _addCardActiveListeners() { // добавить обработчики событий (card)
        this._likeButton.addEventListener('click', this._handleLikeButtonClick); // прикрепить обработчик лайка карточки
        this._deleteButton.addEventListener('click', this._handleDeleteButtonClick()); // прикрепить обработчик удаления карточки
        this._cardImage.addEventListener('click', this._handleCardImageClick(this._newCard, this._cardImage, this._settings)); // прикрепить обработчик просмотра изображения
    }

    generateCard() { // вернуть карточку
        this._elementTemplateCards = document.querySelector(this._templateSelector).content;
        this._cardSelector = this._settings.cardSelector;
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector(this._settings.imageSelector);
        this._cardTitle = this._newCard.querySelector(this._settings.titleSelector);
        this._likeButton = this._newCard.querySelector(this._settings.likeButtonSelector);
        this._deleteButton = this._newCard.querySelector(this._settings.deleteButtonSelector);
        this._cardImage.alt = `Фотография - ${this._cardsName}`;
        this._cardImage.src = this._cardsLink;
        this._cardTitle.textContent = this._cardsName;
        this._addCardActiveListeners();
        return this._newCard;
    }

}