// Стрелочные функции
const handleLikeButtonClick = (evt) => { // обработчик лайка карточки
    const likeButton = evt.target;
    likeButton.classList.toggle('card__item-like-button_active'); // лайк карточки
};

const handleDeleteButtonClick = (card) => { // обработчик удаления карточки
    return () => {
        card.remove(); // удалить карточку
    };
};

const addPreviewInfo = (cardImage, card) => { // добавить изображение и заголовок попапу (image)
    const cardHeading = card.querySelector('.card__item-title').textContent;
    const popupImage = elementPopupImage.querySelector('.popup__image');
    const popupHeading = elementPopupImage.querySelector('.popup__heading');
    popupImage.alt = cardImage.alt;
    popupImage.src = cardImage.src;
    popupHeading.textContent = cardHeading;
};

const closePopup = (popup) => { // закрыть попап
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleKeyEsc); // удалить событие keyup
};

const handleKeyEsc = (evt) => { // обработчик нажатия на клавишу Esc
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};

const openPopup = (popup) => { // открыть попап
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', handleKeyEsc); // прикрепить обработчик нажатия на клавишу Esc
};

const handleCardImageClick = (card, cardImage) => { // обработчик просмотра изображения
    return () => {
        addPreviewInfo(cardImage, card); // добавить изображение и заголовок
        openPopup(elementPopupImage);
    };
};

const addCardActiveListeners = (card, cardImage, settings) => { // добавить обработчики событий (card)
    const likeButton = card.querySelector(settings.likeButtonSelector);
    const deleteButton = card.querySelector(settings.deleteButtonSelector);
    likeButton.addEventListener('click', handleLikeButtonClick); // прикрепить обработчик лайка карточки
    deleteButton.addEventListener('click', handleDeleteButtonClick(card)); // прикрепить обработчик удаления карточки
    cardImage.addEventListener('click', handleCardImageClick(card, cardImage)); // прикрепить обработчик просмотра изображения
};

const createCard = (cardsName, cardsLink, settings) => { // создать карточку
    const newCard = elementCard.cloneNode(true);
    const cardImage = newCard.querySelector(settings.imageSelector);
    const cardTitle = newCard.querySelector(settings.titleSelector);
    cardImage.alt = `Фотография - ${cardsName}`;
    cardImage.src = cardsLink;
    cardTitle.textContent = cardsName;
    addCardActiveListeners(newCard, cardImage, settings);
    return newCard;
};

const addCard = (elem, where) => where.prepend(elem); // вставить в начало элемента (метод вставки)

const handleOpenButtonPopupEditClick = () => { // обработчик открытия попапа (edit)
    openPopup(elementPopupEdit);
    elementPopupEditNameInput.value = introTitle.textContent;
    elementPopupEditJobInput.value = introText.textContent;
};

const handleFormEditSubmit = (evt) => { // обработчик «отправки» формы (edit)
    const popup = evt.currentTarget;
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    introTitle.textContent = elementPopupEditNameInput.value;
    introText.textContent = elementPopupEditJobInput.value;
    closePopup(popup);
};

const handlePopupClick = (popup) => { // обработчик клика по попапу
    return (evt) => {
        const object = evt.target;
        const firstParent = evt.target.closest('div');
        // закрыть попап при нажатии на кнопку или overlay
        if (object.classList.contains('popup__close-button') || object.classList.contains('popup')) {
            if (object === firstParent) {
                closePopup(object);
                return;
            };
            closePopup(popup);
        };
    };
};

const addListenersPopupEdit = (popup, openButton) => { // добавить обработчики событий (edit)
    openButton.addEventListener('click', handleOpenButtonPopupEditClick); // прикрепить обработчик открытия попапа (edit)
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка» 
    popup.addEventListener('submit', handleFormEditSubmit);
    popup.addEventListener('click', handlePopupClick(popup)); // прикрепить обработчик клика
};

const handleOpenButtonPopupNewCardClick = () => { // обработчик открытия попапа (new-card)
    openPopup(elementPopupNewCard);
    elementPopupNewCardForm.reset();
};

const handleFormNewCardSubmit = (settings) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        const popup = evt.currentTarget;
        const card = createCard(elementPopupNewCardNameInput.value, elementPopupNewCardLinkInput.value, settings); // создать карточку
        evt.preventDefault();
        addCard(card, elementSectionCards); // добавить карточку
        closePopup(popup);
    };
};

const addListenersPopupNewCard = (popup, openButton, settingsForCreateCard) => { // добавить обработчики событий (new-card)
    openButton.addEventListener('click', handleOpenButtonPopupNewCardClick); // прикрепить обработчик открытия попапа (new-card)
    popup.addEventListener('submit', handleFormNewCardSubmit(settingsForCreateCard));
    popup.addEventListener('click', handlePopupClick(popup));
};

const clearDataPopupImage = () => { // очистить данные попапа (image)
    elementPopupImagePhoto.alt = '';
    elementPopupImagePhoto.src = '';
    elementPopupImageHeading.text = '';
};

const handlePopupImageClick = (evt) => { // обработчик клика по попапу (image)
    const object = evt.target;
    const firstParent = evt.target.closest('div');
    // закрыть попап при нажатии на кнопку или overlay
    if (object.classList.contains('popup__close-button') || object.classList.contains('popup')) {
        clearDataPopupImage(); // очистить данные попапа
        if (object === firstParent) {
            closePopup(object);
            return;
        };
        closePopup(elementPopupImage);
    };
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    const card = createCard(item.name, item.link, settingsForCreateCard); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
});
addListenersPopupEdit(elementPopupEdit, elementPopupEditButton);
addListenersPopupNewCard(elementPopupNewCard, elementPopupNewCardButton, settingsForCreateCard);
elementPopupImage.addEventListener('click', handlePopupImageClick); // прикрепить обработчик клика (image)