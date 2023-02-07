import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, settingsForCreateCard as settings, elementsForCreatePopups as elements } from './constants.js';
import { settingsForValidation as settingsValidation } from './constants.js';

// Стрелочные функции
const addPreviewInfo = (card, cardImage, settings) => { // добавить изображение и заголовок попапу (image)
    const popupImagePhoto = elements.popupImage.popupImagePhotoElement; // Объект настроек popups (image) - глобальня переменная
    const popupImageHeading = elements.popupImage.popupImageHeadingElement;
    const cardHeading = card.querySelector(settings.titleSelector).textContent;
    popupImagePhoto.alt = cardImage.alt;
    popupImagePhoto.src = cardImage.src;
    popupImageHeading.textContent = cardHeading;
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

const handleCardImageClick = (card, cardImage, settings) => { // обработчик просмотра изображения
    return () => {
        const popupImage = elements.popupImage.popupImageElement; // Превью
        addPreviewInfo(card, cardImage, settings); // добавить изображение и заголовок
        openPopup(popupImage);
    };
};

const addCard = (elem, where) => where.prepend(elem); // вставить в начало элемента (метод вставки)

const handleOpenButtonPopupEditClick = (elements) => { // обработчик открытия попапа (edit)
    return () => {
        const popupEdit = elements.popupEditElement; // Редактировать профиль
        const popupEditNameInput = elements.popupEditNameInputElement; // поля формы в DOM
        const popupEditJobInput = elements.popupEditJobInputElement;
        const introTitle = elements.introTitleElement;
        const introText = elements.introTextElement;
        openPopup(popupEdit);
        popupEditNameInput.value = introTitle.textContent;
        popupEditJobInput.value = introText.textContent;
    };
};

const handleFormEditSubmit = (elements) => { // обработчик «отправки» формы (edit)
    return (evt) => {
        const popup = evt.currentTarget;
        const popupEditNameInput = elements.popupEditNameInputElement; // поля формы в DOM
        const popupEditJobInput = elements.popupEditJobInputElement;
        const introTitle = elements.introTitleElement;
        const introText = elements.introTextElement;
        evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
        introTitle.textContent = popupEditNameInput.value;
        introText.textContent = popupEditJobInput.value;
        closePopup(popup);
    };
};

// вернуть условие клика
const returnConditionClick = (object) => object.classList.contains('popup__close-button') || object.classList.contains('popup');

const handlePopupClick = (evt) => { // обработчик клика по попапу
    const object = evt.target;
    const conditionClick = returnConditionClick(object); // условие клика
    // закрыть попап при нажатии на кнопку или overlay
    if (conditionClick) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};

const addListenersPopupEdit = (elements) => { // добавить обработчики событий (edit)
    const popupEdit = elements.popupEditElement; // Редактировать профиль
    const popupEditButton = elements.popupEditButtonElement;
    popupEditButton.addEventListener('click', handleOpenButtonPopupEditClick(elements)); // прикрепить обработчик открытия попапа (edit)
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка» 
    popupEdit.addEventListener('submit', handleFormEditSubmit(elements));
    popupEdit.addEventListener('click', handlePopupClick); // прикрепить обработчик клика
};

const handleOpenButtonPopupNewCardClick = (elements) => { // обработчик открытия попапа (new-card)
    return () => {
        const popupNewCard = elements.popupNewCardElement; // Новое место
        const popupNewCardForm = elements.popupNewCardFormElement;
        openPopup(popupNewCard);
        popupNewCardForm.reset();
    };
};

const handleFormNewCardSubmit = (settings, elements) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        evt.preventDefault();
        const popup = evt.currentTarget;
        const name = elements.popupNewCardNameInputElement.value;
        const link = elements.popupNewCardLinkInputElement.value;
        const templateCardsSelector = settings.templateSelector;
        const elementSectionCards = document.querySelector(settings.sectionCardsSelector);
        const card = new Card(name, link, templateCardsSelector, settings, handleCardImageClick); // создать экземпляр класса Card
        const cardElement = card.generateCard(); // создать карточку
        addCard(cardElement, elementSectionCards); // добавить карточку
        closePopup(popup);
    };
};

const addListenersPopupNewCard = (elements) => { // добавить обработчики событий (new-card)
    const popupNewCard = elements.popupNewCardElement; // Новое место
    const popupNewCardButton = elements.popupNewCardButtonElement;
    popupNewCardButton.addEventListener('click', handleOpenButtonPopupNewCardClick(elements)); // прикрепить обработчик открытия попапа (new-card)
    popupNewCard.addEventListener('submit', handleFormNewCardSubmit(settings, elements));
    popupNewCard.addEventListener('click', handlePopupClick);
};

const clearDataPopupImage = (elements) => { // очистить данные попапа (image)
    const popupImagePhoto = elements.popupImagePhotoElement;
    const popupImageHeading = elements.popupImageHeadingElement;
    popupImagePhoto.alt = '';
    popupImagePhoto.src = '';
    popupImageHeading.textContent = '';
};

const handlePopupImageClick = (elements) => { // обработчик клика по попапу (image)
    return (evt) => {
        const object = evt.target;
        const conditionClick = returnConditionClick(object); // условие клика
        if (conditionClick) {
            clearDataPopupImage(elements); // очистить данные попапа (image)
        };
    };
};

const addListenersPopupImage = (elements) => { // добавить обработчики событий (image)
    const popupImage = elements.popupImageElement; // Превью
    popupImage.addEventListener('click', handlePopupImageClick(elements)); // прикрепить обработчик клика (image)
    popupImage.addEventListener('click', handlePopupClick);
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    const templateCardsSelector = settings.templateSelector;
    const elementSectionCards = document.querySelector(settings.sectionCardsSelector);
    const card = new Card(item.name, item.link, templateCardsSelector, settings, handleCardImageClick); // создать экземпляр класса Card
    const cardElement = card.generateCard(); // создать карточку
    addCard(cardElement, elementSectionCards); // добавить карточку
});
addListenersPopupEdit(elements.popupEdit);
addListenersPopupNewCard(elements.popupNewCard);
addListenersPopupImage(elements.popupImage);

const popupFormList = Array.from(document.querySelectorAll(settingsValidation.formSelector)); // массив форм
popupFormList.forEach((popupForm) => {  // включить валидацию всех форм
    const form = new FormValidator(settingsValidation, popupForm); // создать экземпляр класса FormValidator
    form.enableValidation(); // включить валидацию формы
});