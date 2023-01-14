// Стрелочные функции
const returnFirstElement = (where, elem) => where.querySelector(elem); // вернуть первый элемент
const addCard = (elem, where) => where.prepend(elem); // вставить в начало элемента (метод вставки)
const switchBinary = (elem, className) => elem.classList.toggle(className); // переключатель
const addClass = (elem, className) => elem.classList.add(className); // добавить класс

// Функции
function addPreviewInfo(cardImage, card) { // добавить изображение и заголовок попапу (image)
    const cardHeading = returnFirstElement(card, '.card__item-title').textContent;
    const formImagePopup = returnFirstElement(elementPopupImage, '.card__image');
    const formHeadingPopup = returnFirstElement(elementPopupImage, '.popup__form-heading');
    formImagePopup.alt = cardImage.alt;
    formImagePopup.src = cardImage.src;
    formHeadingPopup.textContent = cardHeading;
};

function openPopup(popup) { // открыть попап
    popup.classList.add('popup_opened');
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
    });
};

function createCard(cardsName, cardsLink) { // создать карточку
    const newCard = elementCard.cloneNode(true);
    const cardImage = returnFirstElement(newCard, '.card__image');
    const cardTitle = returnFirstElement(newCard, '.card__item-title');
    cardImage.alt = `Фотография - ${cardsName}`;
    cardImage.src = cardsLink;
    cardTitle.textContent = cardsName;
    cardImage.onerror = function () {
        alert("Ошибка во время загрузки изображения");
    };
    addCardActiveListeners(newCard);
    return newCard;
};

function closePopup(popup) { // закрыть попап
    popup.classList.remove('popup_opened');
};

function addEventCloseButton(popup) { // закрыть попап при нажатии на кнопку
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', function () {
        closePopup(popup);
    });
};

function handleFormEditSubmit(evt) { // обработчик «отправки» формы (edit)
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    introTitle.textContent = elementPopupEditNameInput.value;
    introText.textContent = elementPopupEditJobInput.value;
    closePopup(evt.currentTarget);
};

function addListenersPopupEdit(popup, openButton) { // добавить обработчики событий (edit)
    addEventCloseButton(popup); // закрыть попап при нажатии на кнопку
    openButton.addEventListener('click', function () {
        openPopup(popup);
        elementPopupEditNameInput.value = introTitle.textContent;
        elementPopupEditJobInput.value = introText.textContent;
    });
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка»
    popup.addEventListener('submit', handleFormEditSubmit);
};

function handleFormNewCardSubmit(evt) { // обработчик «отправки» формы (new-card)
    evt.preventDefault();
    const card = createCard(elementPopupNewCardNameInput.value, elementPopupNewCardLinkInput.value); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
    closePopup(evt.currentTarget);
};

function addListenersPopupNewCard(popup, openButton) { // добавить обработчики событий (new-card)
    addEventCloseButton(popup);
    openButton.addEventListener('click', function () {
        openPopup(popup);
        elementPopupNewCardNameInput.value = '';
        elementPopupNewCardLinkInput.value = '';
    });
    popup.addEventListener('submit', handleFormNewCardSubmit);
};

function initPopupImage() { // инициализировать попап (image)
    const closeButton = elementPopupImage.querySelector('.popup__close-button');
    const formImagePopup = returnFirstElement(elementPopupImage, '.card__image');
    const formHeadingPopup = elementPopupImage.querySelector('.popup__form-heading');
    closeButton.addEventListener('click', function () {
        formImagePopup.alt = '';
        formImagePopup.src = '';
        formHeadingPopup.text = '';
    });
    addEventCloseButton(elementPopupImage);
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    const card = createCard(item.name, item.link); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
});
addListenersPopupEdit(elementPopupEdit, elementPopupEditButton);
addListenersPopupNewCard(elementPopupNewCard, elementPopupNewCardButton);
initPopupImage();