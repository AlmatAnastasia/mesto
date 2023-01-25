// Стрелочные функции
const addCard = (elem, where) => where.prepend(elem); // вставить в начало элемента (метод вставки)
const switchBinary = (elem, className) => elem.classList.toggle(className); // переключатель
const addClass = (elem, className) => elem.classList.add(className); // добавить класс
const hasClass = (elem, className) => elem.classList.contains(className); // проверить наличие класса
// evt.preventDefault(); - отмена стандартной отправки формы (определение собственной логики отправки)
const changeDefaultAction = (evt) => evt.preventDefault(); // изменить действие по умолчанию

// Функции
function addPreviewInfo(cardImage, card) { // добавить изображение и заголовок попапу (image)
    const cardHeading = returnFirstElement(card, '.card__item-title').textContent;
    const popupImage = returnFirstElement(elementPopupImage, '.popup__image');
    const popupHeading = returnFirstElement(elementPopupImage, '.popup__heading');
    popupImage.alt = cardImage.alt;
    popupImage.src = cardImage.src;
    popupHeading.textContent = cardHeading;
};

function openPopup(popup) { // открыть попап
    popup.classList.add('popup_opened');
};

function closePopup(popup) { // закрыть попап
    popup.classList.remove('popup_opened');
};

function handleKeyEsc(evt) { // обработчик нажатия на клавишу Esc
    const popupList = Array.from(returnAllElements(document, '.popup'));
    const popup = popupList.filter(function (popup) {
        return (hasClass(popup, 'popup_opened') === true);
    })[0];
    if (evt.key === 'Escape') {
        closePopup(popup);
        document.removeEventListener('keyup', handleKeyEsc); // удалить событие keyup
    };
};

function addCardActiveListeners(card) { // добавить обработчики событий (card)
    const likeButton = returnFirstElement(card, '.card__item-like-button');
    const deleteButton = returnFirstElement(card, '.card__delete-button');
    const cardImage = returnFirstElement(card, '.card__image');
    likeButton.addEventListener('click', function (evt) { // делегирование событий
        const likeButton = evt.target;
        switchBinary(likeButton, 'card__item-like-button_active'); // лайк карточки
    });
    deleteButton.addEventListener('click', function (evt) {
        card.remove(); // удалить карточку
    });
    cardImage.addEventListener('click', function (evt) {
        addPreviewInfo(cardImage, card); // добавить изображение и заголовок
        openPopup(elementPopupImage);
        document.addEventListener('keyup', handleKeyEsc); // прикрепить обработчик нажатия на клавишу Esc
    });
};

function createCard(cardsName, cardsLink) { // создать карточку
    const newCard = elementCard.cloneNode(true);
    const cardImage = returnFirstElement(newCard, '.card__image');
    const cardTitle = returnFirstElement(newCard, '.card__item-title');
    cardImage.alt = `Фотография - ${cardsName}`;
    cardImage.src = cardsLink;
    cardTitle.textContent = cardsName;
    addCardActiveListeners(newCard);
    return newCard;
};

function addEventCloseButton(popup) { // закрыть попап при нажатии на кнопку
    const closeButton = returnFirstElement(popup, '.popup__close-button');
    closeButton.addEventListener('click', function () {
        closePopup(popup);
    });
};

function addEventPopup(popup) { // закрыть попап при нажатии на кнопку или overlay
    popup.addEventListener('click', function (evt) {
        const button = evt.target;
        if (hasClass(button, 'popup__close-button') || hasClass(button, 'popup')) {
            // закрыть попап при нажатии на кнопку
            // закрыть попап при нажатии на overlay
            hasClass(button, 'popup__close-button') ? addEventCloseButton(popup) : closePopup(popup);
        };
    });
};

function handleFormEditSubmit(evt) { // обработчик «отправки» формы (edit)
    const popup = evt.currentTarget;
    const submitButton = returnFirstElement(popup, settingsForValidation.buttonSelector);
    introTitle.textContent = elementPopupEditNameInput.value;
    introText.textContent = elementPopupEditJobInput.value;
    closePopup(popup);
    popup.removeEventListener('submit', handleFormEditSubmit); // удалить обработчик отправки
    makeButtonInactive(submitButton, settingsForValidation.buttonClass); // сделать кнопку неактивной
};

function addEventSubmitButton(popup, submitFunc) { // отправить попап при нажатии на кнопку
    const submitButton = returnFirstElement(popup, '.popup__submit');
    submitButton.addEventListener('click', function () {
        const buttonStatus = hasClass(submitButton, 'popup__submit_disabled');
        if (!buttonStatus) { // если false, кнопка активна
            popup.addEventListener('submit', submitFunc); // прикрепить обработчик отправки
        };
    });
};

function addListenersPopupEdit(popup, openButton) { // добавить обработчики событий (edit)
    addEventPopup(popup); // закрыть попап при нажатии на кнопку или overlay
    openButton.addEventListener('click', function () {
        openPopup(popup);
        document.addEventListener('keyup', handleKeyEsc);
        elementPopupEditNameInput.value = introTitle.textContent;
        elementPopupEditJobInput.value = introText.textContent;
        addEventSubmitButton(popup, handleFormEditSubmit); // отправить попап при нажатии на кнопку
    });
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка»
    popup.addEventListener('submit', changeDefaultAction); // прикрепить обработчик отмены стандартной отправки
};

function handleFormNewCardSubmit(evt) { // обработчик «отправки» формы (new-card)
    const popup = evt.currentTarget;
    const card = createCard(elementPopupNewCardNameInput.value, elementPopupNewCardLinkInput.value); // создать карточку
    const submitButton = returnFirstElement(popup, settingsForValidation.buttonSelector);
    addCard(card, elementSectionCards); // добавить карточку
    closePopup(popup);
    popup.removeEventListener('submit', handleFormNewCardSubmit); // удалить обработчик отправки
    makeButtonInactive(submitButton, settingsForValidation.buttonClass); // сделать кнопку неактивной
};

function addListenersPopupNewCard(popup, openButton) { // добавить обработчики событий (new-card)
    addEventPopup(popup);
    openButton.addEventListener('click', function () {
        openPopup(popup);
        document.addEventListener('keyup', handleKeyEsc);
        elementPopupNewCardNameInput.value = '';
        elementPopupNewCardLinkInput.value = '';
        addEventSubmitButton(popup, handleFormNewCardSubmit);
    });
    popup.addEventListener('submit', changeDefaultAction);
};

function initPopupImage() { // инициализировать попап (image)
    const closeButton = returnFirstElement(elementPopupImage, '.popup__close-button');
    const popupImage = returnFirstElement(elementPopupImage, '.popup__image');
    const popupHeading = returnFirstElement(elementPopupImage, '.popup__heading');
    closeButton.addEventListener('click', function () {
        popupImage.alt = '';
        popupImage.src = '';
        popupHeading.text = '';
    });
    addEventPopup(elementPopupImage);
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    const card = createCard(item.name, item.link); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
});
addListenersPopupEdit(elementPopupEdit, elementPopupEditButton);
addListenersPopupNewCard(elementPopupNewCard, elementPopupNewCardButton);
initPopupImage();