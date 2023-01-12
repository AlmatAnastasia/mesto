// Стрелочные функции
const returnFirstElement = (where, elem) => where.querySelector(elem); // вернуть первый элемент
const addCard = (elem, where) => where.prepend(elem); // вставить в начало элемента (метод вставки)
const switchBinary = (elem, className) => elem.classList.toggle(className); // переключатель
const addClass = (elem, className) => elem.classList.add(className); // добавить класс

// Функции
function addPreviewInfo(popup, cardImage, card) { // добавить изображение и заголовок попапу (image)
    const cardHeading = returnFirstElement(card, '.card__item-title').textContent;
    const formImagePopup = returnFirstElement(popup, '.card__image');
    const formHeadingPopup = returnFirstElement(popup, '.popup__form-heading');
    formImagePopup['alt'] = cardImage['alt'];
    formImagePopup['src'] = cardImage['src'];
    formHeadingPopup['textContent'] = cardHeading;
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
        addPreviewInfo(elementPopupImage, cardImage, card); // добавить изображение и заголовок
        openPopup(elementPopupImage);
    });
};

function createCard(cardsName, cardsLink) { // создать карточку
    const newCard = elementCard.cloneNode(true);
    const cardImage = returnFirstElement(newCard, '.card__image');
    const cardTitle = returnFirstElement(newCard, '.card__item-title');
    cardImage['alt'] = `Фотография - ${cardsName}`;
    cardImage['src'] = cardsLink;
    cardTitle['textContent'] = cardsName;
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
    const nameInput = returnFirstElement(evt.target, '.popup__input_type_name-text');
    const jobInput = returnFirstElement(evt.target, '.popup__input_type_description-text');
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    introTitle['textContent'] = nameInput.value;
    introText['textContent'] = jobInput.value;
    closePopup(evt.currentTarget);
};

function addListenersPopupEdit(popup, openButton) { // добавить обработчики событий (edit)
    const nameInput = returnFirstElement(popup, '.popup__input_type_name-text'); // поля формы в DOM
    const jobInput = returnFirstElement(popup, '.popup__input_type_description-text');
    addEventCloseButton(popup); // закрыть попап при нажатии на кнопку
    openButton.addEventListener('click', function () {
        openPopup(popup);
        nameInput.value = introTitle.textContent;
        jobInput.value = introText.textContent;
    });
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка»
    popup.addEventListener('submit', handleFormEditSubmit);
};

function handleFormNewCardSubmit(evt) { // обработчик «отправки» формы (new-card)
    const nameInput = returnFirstElement(evt.target, '.popup__input_type_name-text');
    const linkInput = returnFirstElement(evt.target, '.popup__input_type_description-url');
    evt.preventDefault();
    const card = createCard(nameInput.value, linkInput.value); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
    closePopup(evt.currentTarget);
};

function addListenersPopupNewCard(popup, openButton) { // добавить обработчики событий (new-card)
    addEventCloseButton(popup);
    openButton.addEventListener('click', function () {
        openPopup(popup);
    });
    popup.addEventListener('submit', handleFormNewCardSubmit);
};

function addPopup(section, popup, openButton, functionName) { // добавить попап (edit, new-card)
    functionName(popup, openButton);
    addCard(popup, section);
};

function addPopupImage(section, popup) { // добавить попап (image)
    const closeButton = popup.querySelector('.popup__close-button');
    const formImagePopup = returnFirstElement(popup, '.card__image');
    const formHeadingPopup = popup.querySelector('.popup__form-heading');
    closeButton.addEventListener('click', function () {
        formImagePopup['alt'] = '';
        formImagePopup['src'] = '';
        formHeadingPopup['text'] = '';
    });
    addEventCloseButton(popup);
    addCard(popup, section);
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    const card = createCard(item.name, item.link); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
});
addPopup(elementSectionPopups, elementPopupEdit, elementPopupEditButton, addListenersPopupEdit);
addPopup(elementSectionPopups, elementPopupNewCard, elementPopupNewCardButton, addListenersPopupNewCard);
addPopupImage(elementSectionPopups, elementPopupImage);