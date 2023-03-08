export default class Card { // класс Card, который создаёт карточку с текстом и ссылкой на изображение

    // конструктор принимает данные карточки и селектор template-элемента
    constructor({
        data: { likes, _id, name, link, owner, createdAt, personalToken }, // данные карточки (включая информацию по лайкам)
        methods: {
            handleCardImageClick, // обработчик просмотра изображения
            handleLikeButtonClick, // обработчик лайка карточки
            handleDeleteButtonClick, // обработчик удаления карточки
        },
        settings: {
            templateSelector, cardSelector, imageSelector, titleSelector, labelLikeSelector, likeButtonSelector, deleteButtonSelector
        } // Объект настроек для создания карточки
    }) { // Инкапсуляция
        // приватные поля (переменные с this) экземпляра класса Card
        this._cardsLike = likes; // данные карточки
        this._cardsId = _id;
        this._cardsName = name;
        this._cardsLink = link;
        this._token = personalToken;
        this._handleCardImageClick = handleCardImageClick; // обработчик просмотра изображения
        this._handleLikeButtonClick = handleLikeButtonClick; // обработчик лайка карточки
        this._handleDeleteButtonClick = handleDeleteButtonClick; // обработчик удаления карточки
        this._templateSelector = templateSelector; // селектор template-элемента
        this._cardSelector = cardSelector;
        this._titleSelector = titleSelector;
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector(imageSelector);
        this._cardTitle = this._newCard.querySelector(titleSelector);
        this._labelLike = this._newCard.querySelector(labelLikeSelector);
        this._likeButton = this._newCard.querySelector(likeButtonSelector);
        this._deleteButton = this._newCard.querySelector(deleteButtonSelector);
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

    _addCardActiveListeners() { // добавить обработчики событий (card)
        this._likeButton.addEventListener('click', this._handleLikeButtonClick); // прикрепить обработчик лайка карточки
        if (this._cardsId === this._token) {
            this._deleteButton.addEventListener('click', this._handleDeleteButtonClick(this._newCard)); // прикрепить обработчик удаления карточки
        } else {
            this._deleteButton.remove(); // удалить корзину
        }
        this._cardImage.addEventListener('click', this._handleCardImageClick(this._newCard, this._cardImage, this._titleSelector)); // прикрепить обработчик просмотра изображения
    }

    generateCard() { // вернуть карточку
        // приватные поля (переменные с this)
        this._cardTitle.textContent = this._cardsName;
        this._cardImage.alt = `Фотография - ${this._cardsName}`;
        this._cardImage.src = this._cardsLink;
        this._labelLike.textContent = this._cardsLike.length;
        this._addCardActiveListeners();
        return this._newCard;
    }

}
