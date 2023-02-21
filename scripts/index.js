import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, settingsForCreateCard as settings, elementsForCreatePopups as elements } from './constants.js';
import { popupFormValidators, settingsForValidation as config } from './constants.js';
// Деструктурирующее присваивание (деструктуризация объекта)
const {
    popupEdit: {
        popupListElement: popupList,
        popupEditElement: popupEdit, // Редактировать профиль
        popupEditFormElement: popupEditForm,
        popupEditNameInputElement: popupEditNameInput, // поля формы в DOM
        popupEditJobInputElement: popupEditJobInput,
        popupEditButtonElement: popupEditButton,
        introTitleElement: introTitle,
        introTextElement: introText,
    },
    popupNewCard: {
        popupNewCardElement: popupNewCard, // Новое место
        popupNewCardNameInputElement: popupNewCardNameInput,
        popupNewCardLinkInputElement: popupNewCardLinkInput,
        popupNewCardFormElement: popupNewCardForm,
        popupNewCardButtonElement: popupNewCardButton,
    },
    popupImage: {
        popupImageElement: popupImage, // Превью
        popupImagePhotoElement: popupImagePhoto,
        popupImageHeadingElement: popupImageHeading
    }
} = elements;

// Стрелочные функции
const createCard = (name, link) => { // создать карточку
    const templateCardsSelector = settings.templateSelector;
    const card = new Card(name, link, templateCardsSelector, settings, handleCardImageClick); // создать экземпляр класса Card
    const cardElement = card.generateCard(); // вернуть карточку
    return cardElement;
};

const addCard = (name, link) => { // добавить карточку
    const elementSectionCards = document.querySelector(settings.sectionCardsSelector);
    const cardElement = createCard(name, link); // создать карточку
    elementSectionCards.prepend(cardElement); // вставить карточку в начало элемента (метод вставки)
};

const addPreviewInfo = (card, cardImage, settings) => { // добавить изображение и заголовок попапу (image)
    // Объект настроек popups (image) - глобальня переменная
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
        addPreviewInfo(card, cardImage, settings); // добавить изображение и заголовок
        openPopup(popupImage);
    };
};

const handleOpenButtonPopupEditClick = () => { // обработчик открытия попапа (edit)
    openPopup(popupEdit);
    popupEditNameInput.value = introTitle.textContent;
    popupEditJobInput.value = introText.textContent;
    // вызвать метод resetValidation экземпляра класса под именем формы
    popupFormValidators[popupEditForm.name].resetValidation(); // сбросить проверку
};

const handleFormEditSubmit = (evt) => { // обработчик «отправки» формы (edit)
    const popup = evt.currentTarget;
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    introTitle.textContent = popupEditNameInput.value;
    introText.textContent = popupEditJobInput.value;
    closePopup(popup);
};

const addListenersPopupEdit = () => { // добавить обработчики событий (edit)
    popupEditButton.addEventListener('click', handleOpenButtonPopupEditClick); // прикрепить обработчик открытия попапа (edit)
    // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка» 
    popupEdit.addEventListener('submit', handleFormEditSubmit);
};

const handleOpenButtonPopupNewCardClick = () => { // обработчик открытия попапа (new-card)
    openPopup(popupNewCard);
    popupNewCardForm.reset();
    // вызвать метод resetValidation экземпляра класса под именем формы
    popupFormValidators[popupNewCardForm.name].resetValidation(); // сбросить проверку
};

const handleFormNewCardSubmit = (settings) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        evt.preventDefault();
        const popup = evt.currentTarget;
        const name = popupNewCardNameInput.value;
        const link = popupNewCardLinkInput.value;
        // логика вставки и логика создания
        addCard(name, link); // добавить карточку
        closePopup(popup);
    };
};

const addListenersPopupNewCard = () => { // добавить обработчики событий (new-card)
    popupNewCardButton.addEventListener('click', handleOpenButtonPopupNewCardClick); // прикрепить обработчик открытия попапа (new-card)
    popupNewCard.addEventListener('submit', handleFormNewCardSubmit(settings));
};

const clearDataPopupImage = () => { // очистить данные попапа (image)
    popupImagePhoto.alt = '';
    popupImagePhoto.src = '';
    popupImageHeading.textContent = '';
};

const closePopupClick = (popupElement, object, haveClass, universalСlass) => { // закрыть попап при нажатии (на кнопку или overlay)
    if (object.classList.contains(universalСlass)) {
        closePopup(popupElement);
        if (haveClass) {
            clearDataPopupImage(); // очистить данные попапа (image)
        };
    };
};

const handlePopupClick = (popupElement) => { // обработчик нажатия на попап
    return (evt) => {
        const object = evt.target;
        const haveClass = popupElement.classList.contains('popup_type_image'); // наличие класса
        closePopupClick(popupElement, object, haveClass, 'popup_opened'); // закрыть попап при нажатии на overlay
        closePopupClick(popupElement, object, haveClass, 'popup__close-button'); // закрыть попап при нажатии на кнопку
    };
};

const addListenerPopups = () => { // добавить обработчик события всем попапам
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', handlePopupClick(popupElement)); // прикрепить обработчик нажатия на попап
    });
};

const enableValidationAllForms = () => { // включить валидацию для всех форм
    const popupFormList = Array.from(document.querySelectorAll(config.formSelector)); // массив форм
    popupFormList.forEach((popupFormElement) => {  // включить валидацию всех форм
        const validator = new FormValidator(config, popupFormElement); // создать экземпляр класса FormValidator
        const popupFormName = popupFormElement.getAttribute('name'); // данные из атрибута 'name' у формы
        popupFormValidators[popupFormName] = validator; // записать экземпляр класса под именем формы
        validator.enableValidation(); // включить валидацию формы
    });
};

// Основной код
initialCards.reverse().forEach((item) => { // создать шесть карточек
    // логика вставки и логика создания
    addCard(item.name, item.link); // добавить карточку
});
addListenersPopupEdit();
addListenersPopupNewCard();
addListenerPopups();
enableValidationAllForms();