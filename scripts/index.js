// Добавление переменных card
const initialCards = [ // массив карточек
    {
        name: 'Дворец земледельцев',
        link: 'https://images.unsplash.com/photo-1591390133438-532f27239ff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80'
    },
    {
        name: 'Петергоф',
        link: 'https://images.unsplash.com/photo-1577696209178-253df230b5f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Мурманская область',
        link: 'https://images.unsplash.com/photo-1610554121420-7e4afe41d616?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
        name: 'Гора Эльбрус',
        link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Домбай',
        link: 'https://images.unsplash.com/photo-1617911478446-c7f1dd96966e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
        name: 'Куршская коса',
        link: 'https://images.unsplash.com/photo-1645127434513-63c301ebf6de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80'
    }
];
const elementTemplateCards = document.querySelector('.cards-template').content;
let elementSectionCards = document.querySelector('.cards__list');
const elementCard = elementTemplateCards.querySelector('.card');
// Добавление переменных popups (edit, new-card, image)
const elementTemplatePopups = document.querySelector('.popups-template').content;
let elementSectionPopups = document.querySelector('.popups');
const elementPopupEdit = elementTemplatePopups.querySelector('.popup_type_edit'); // Редактировать профиль
const elementPopupEditButton = document.querySelector('.profile__intro-edit-button');
let introTitle = document.querySelector('.profile__intro-title');
let introText = document.querySelector('.profile__intro-text');
const elementPopupNewCard = elementTemplatePopups.querySelector('.popup_type_new-card'); // Новое место
const elementPopupNewCardButton = document.querySelector('.profile__add-button');
const elementPopupImage = elementTemplatePopups.querySelector('.popup_type_image'); // Превью
let clonePopupImage = undefined;

// Стрелочные функции
const returnFirstElement = (where, elem) => where.querySelector(elem); // вернуть первый элемент
const addAttribute = (elem, attr, text) => { elem[attr] = text; }; // добавить атрибут (alt, src, textContent)
const addCard = (elem, where) => where.prepend(elem); // вставить в начало элемента (метод вставки)
const switchBinary = (elem, className) => elem.classList.toggle(className); // переключатель
const addClass = (elem, className) => elem.classList.add(className); // добавить класс

// Функции
function addPreviewInfo(popup, openButton, card) { // добавить изображение и заголовок попапу (image)
    const cardImage = openButton.cloneNode(true);
    const cardHeading = returnFirstElement(card, '.card__item-title').cloneNode(true).textContent;
    const formPopup = returnFirstElement(popup, '.popup__form');
    const formHeadingPopup = returnFirstElement(popup, '.popup__form-heading');
    formPopup.prepend(cardImage);
    formHeadingPopup.textContent = cardHeading;
    switchBinary(cardImage, 'card__image');
    switchBinary(cardImage, 'card__image_preview');
};

function openPopup(popupForm) { // открыть попап
    switchBinary(popupForm, 'popup_smooth-open');
    switchBinary(popupForm, 'popup_opened');
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
        addPreviewInfo(clonePopupImage, cardImage, card); // добавить изображение и заголовок
        openPopup(clonePopupImage);
    });
};

function createCard(cardsName, cardsLink) { // создать карточку
    const newCard = elementCard.cloneNode(true);
    const cardImage = returnFirstElement(newCard, '.card__image');
    const cardTitle = returnFirstElement(newCard, '.card__item-title');
    addAttribute(cardImage, 'alt', `Фотография - ${cardsName}`);
    addAttribute(cardImage, 'src', cardsLink);
    addAttribute(cardTitle, 'textContent', cardsName);
    cardImage.onerror = function () {
        alert("Ошибка во время загрузки изображения");
        card.remove();
    };
    addCardActiveListeners(newCard);
    return newCard;
};

function addEventCloseButton(popup) { // закрыть попап при нажатии на кнопку
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', function () {
        closePopup(popup); // popupForm.classList.remove('popup_opened');
    });
};

function closePopup(popupForm) { // закрыть попап
    switchBinary(popupForm, 'popup_smooth-close');
    setTimeout(() => {
        switchBinary(popupForm, 'popup_opened');
        switchBinary(popupForm, 'popup_smooth-open');
        switchBinary(popupForm, 'popup_smooth-close');
    }, 1000);
};

function handleFormSubmitEdit(evt) { // обработчик «отправки» формы (edit)
    const nameInput = returnFirstElement(evt.target, '.popup__input_type_name-text');
    const jobInput = returnFirstElement(evt.target, '.popup__input_type_description-text');
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    addAttribute(introTitle, 'textContent', nameInput.value);
    addAttribute(introText, 'textContent', jobInput.value);
    closePopup(evt.currentTarget); // popupForm.classList.remove('popup_opened');
};

function addListenersPopupEdit(popup, openButton) { // добавить обработчики событий (edit)
    let nameInput = returnFirstElement(popup, '.popup__input_type_name-text'); // поля формы в DOM
    let jobInput = returnFirstElement(popup, '.popup__input_type_description-text');
    addEventCloseButton(popup); // закрыть попап при нажатии на кнопку
    openButton.addEventListener('click', function () {
        openPopup(popup); // popupForm.classList.add('popup_opened');
        nameInput.value = introTitle.textContent;
        jobInput.value = introText.textContent;
    });
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка»
    popup.addEventListener('submit', handleFormSubmitEdit);
};

function handleFormSubmitNewCard(evt) { // обработчик «отправки» формы (new-card)
    const nameInput = returnFirstElement(evt.target, '.popup__input_type_name-text');
    const jobInput = returnFirstElement(evt.target, '.popup__input_type_description-text');
    const card = createCard(nameInput.value, jobInput.value); // создать карточку
    evt.preventDefault();
    addCard(card, elementSectionCards); // добавить карточку
    closePopup(evt.currentTarget);
};

function addListenersPopupNewCard(popup, openButton) { // добавить обработчики событий (new-card)
    addEventCloseButton(popup);
    openButton.addEventListener('click', function () {
        openPopup(popup);
    });
    popup.addEventListener('submit', handleFormSubmitNewCard);
};

function addPopup(section, element, openButton, functionName) { // добавить попап (edit, new-card)
    const newPopup = element.cloneNode(true); // template элемент
    functionName(newPopup, openButton);
    addCard(newPopup, section);
};

function addPopupImage(section, element) { // добавить попап (image)
    const newPopup = element.cloneNode(true); // template элемент
    const closeButton = newPopup.querySelector('.popup__close-button');
    const formPopup = newPopup.querySelector('.popup__form');
    const formHeadingPopup = newPopup.querySelector('.popup__form-heading');
    closeButton.addEventListener('click', function () {
        const imagePopup = returnFirstElement(formPopup, '.card__image_preview');
        setTimeout(() => {
            imagePopup.remove();
            formHeadingPopup.textContent = '';
        }, 1000);
    });
    addEventCloseButton(newPopup);
    addCard(newPopup, section);
    return newPopup;
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    const cardsName = item.name; // заголовок и ссылка
    const cardsLink = item.link;
    const card = createCard(cardsName, cardsLink); // создать карточку
    addCard(card, elementSectionCards); // добавить карточку
});
addPopup(elementSectionPopups, elementPopupEdit, elementPopupEditButton, addListenersPopupEdit);
addPopup(elementSectionPopups, elementPopupNewCard, elementPopupNewCardButton, addListenersPopupNewCard);
clonePopupImage = addPopupImage(elementSectionPopups, elementPopupImage);