export default class Card { // класс Card, который создаёт карточку с текстом и ссылкой на изображение

    // конструктор принимает данные карточки и селектор template-элемента
    constructor(
        { name, link, handleCardImageClick },
        // Объект настроек для создания карточки
        { templateSelector, cardSelector, imageSelector, titleSelector, likeButtonSelector, deleteButtonSelector }
    ) { // Инкапсуляция
        // приватные поля (переменные с this) экземпляра класса Card
        this._cardsName = name; // данные карточки
        this._cardsLink = link;
        this._handleCardImageClick = handleCardImageClick;
        this._templateSelector = templateSelector; // селектор template-элемента
        this._elementTemplateCards = document.querySelector(templateSelector).content;
        this._cardSelector = cardSelector;
        this._imageSelector = imageSelector;
        this._titleSelector = titleSelector;
        this._likeButtonSelector = likeButtonSelector;
        this._deleteButtonSelector = deleteButtonSelector;
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
        this._cardImage.addEventListener('click', this._handleCardImageClick(this._newCard, this._cardImage, this._titleSelector)); // прикрепить обработчик просмотра изображения
    }

    generateCard() { // вернуть карточку
        // приватные поля (переменные с this)
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector(this._imageSelector);
        this._cardTitle = this._newCard.querySelector(this._titleSelector);
        this._likeButton = this._newCard.querySelector(this._likeButtonSelector);
        this._deleteButton = this._newCard.querySelector(this._deleteButtonSelector);
        this._cardImage.alt = `Фотография - ${this._cardsName}`;
        this._cardImage.src = this._cardsLink;
        this._cardTitle.textContent = this._cardsName;
        this._addCardActiveListeners();
        return this._newCard;
    }

}
