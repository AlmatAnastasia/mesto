import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
    initialCards,
    sectionCardsSelector,
    settingsForCreateCard as settings,
    elementsForCreatePopups as elements,
    settingsForCreatePopupImage as settingsPopupImage,
    settingsForCreatePopups as selectors,
    settingsForValidation as config,
    popupFormValidators
} from '../utils/constants.js';
// Деструктурирующее присваивание (деструктуризация объекта)
const {
    popupEditNameInput: popupEditNameInput,
    popupEditJobInput: popupEditJobInput,
    popupEditButtonElement: popupEditButton,
    popupNewCardButtonElement: popupNewCardButton,
} = elements;
const {
    popupEditSelector: popupEditSelector, // Редактировать профиль
    introTitleSelector: introTitleSelector, // поля профиля (информация о пользователе)
    introTextSelector: introTextSelector,
    popupNewCardSelector: popupNewCardSelector, // Новое место
    popupNameInputSelector: popupNameInputSelector, // поля формы в DOM
    popupEditJobInputSelector: popupEditJobInputSelector,
    popupNewCardLinkInputSelector: popupNewCardLinkInputSelector,
    popupImageSelector: popupImageSelector, // Превью
} = selectors;

// Стрелочные функции
const handleCardImageClick = (card, cardImage, titleSelector) => { // обработчик просмотра изображения
    return () => {
        const name = card.querySelector(titleSelector).textContent;
        const link = cardImage.src;
        const description = cardImage.alt;
        instancePopupWithImage.open(name, link, description);
    };
};

const createCard = (name, link) => { // создать карточку
    const instanceCard = new Card({ name, link, handleCardImageClick }, settings); // создать экземпляр класса Card
    const cardElement = instanceCard.generateCard(); // вернуть карточку
    return cardElement;
};

const handleOpenButtonPopupEditClick = () => { // обработчик открытия попапа (edit)
    return () => {
        const { name, job } = instanceUserInfo.getUserInfo();
        const conditionOpen = handleOpenButtonPopupEditClick.someValue === 0; // первое открытие попапа
        if (!conditionOpen) {
            popupEditNameInput.value = name; // добавить данные пользователя
            popupEditJobInput.value = job;
        }
        handleOpenButtonPopupEditClick.someValue += 1; // счетчик
        instancePopupWithFormEdit.open();
    };
};

const handleFormEditSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (edit)
    return (evt) => {
        evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
        const popupValues = submitHandler();
        const popupEditName = popupValues[popupNameInputSelector];
        const popupEditJob = popupValues[popupEditJobInputSelector];
        instanceUserInfo.setUserInfo(popupEditName, popupEditJob);
        close();
    }
};

const addListenersPopupEdit = () => { // добавить обработчики событий (edit)
    instancePopupWithFormEdit.setEventListeners();
    handleOpenButtonPopupEditClick.someValue = 0; // счетчик
    popupEditButton.addEventListener('click', handleOpenButtonPopupEditClick()); // прикрепить обработчик открытия попапа (edit)
};

const handleOpenButtonPopupNewCardClick = () => { // обработчик открытия попапа (new-card)
    return () => instancePopupWithFormNewCard.open();
};

const handleFormNewCardSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        evt.preventDefault();
        const popupValues = submitHandler();
        const name = popupValues[popupNameInputSelector];
        const link = popupValues[popupNewCardLinkInputSelector];
        // логика вставки и логика создания
        const cardElement = createCard(name, link); // создать карточку
        instanceSection.addItem(cardElement); // добавить карточку
        close();
    }
};

const addListenersPopupNewCard = () => { // добавить обработчики событий (new-card)
    instancePopupWithFormNewCard.setEventListeners();
    popupNewCardButton.addEventListener('click', handleOpenButtonPopupNewCardClick()); // прикрепить обработчик открытия попапа (new-card)
};

const addListenerPopupImage = () => { // добавить обработчик события (image)
    instancePopupWithImage.setEventListeners();
};

const enableValidationAllForms = () => { // включить валидацию для всех форм
    const popupFormList = Array.from(document.querySelectorAll(config.formSelector)); // массив форм
    popupFormList.forEach((popupFormElement) => {  // включить валидацию всех форм
        const instanceFormValidator = new FormValidator(config, popupFormElement); // создать экземпляр класса FormValidator
        const popupFormName = popupFormElement.getAttribute('name'); // данные из атрибута 'name' у формы
        popupFormValidators[popupFormName] = instanceFormValidator; // записать экземпляр класса под именем формы
        instanceFormValidator.enableValidation(); // включить валидацию формы
    });
};

// Создание экземпляров классов
const instancePopupWithFormEdit = new PopupWithForm(
    popupEditSelector,
    handleFormEditSubmit,
    popupFormValidators // объект экземпляров класса FormValidator
); // создать экземпляр класса PopupWithForm (edit)
const instancePopupWithFormNewCard = new PopupWithForm(
    popupNewCardSelector,
    handleFormNewCardSubmit,
    popupFormValidators // объект экземпляров класса FormValidator
); // создать экземпляр класса PopupWithForm (new-card)
const instancePopupWithImage = new PopupWithImage(popupImageSelector, settingsPopupImage); // создать экземпляр класса PopupWithImage
const instanceUserInfo = new UserInfo({ introTitleSelector, introTextSelector }); // создать экземпляр класса UserInfo
const instanceSection = new Section({ // создать экземпляр класса Section
    items: initialCards,
    renderer: (item) => {
        // логика вставки и логика создания
        const cardElement = createCard(item.name, item.link); // создать карточку
        instanceSection.addItem(cardElement); // добавить карточку
    }
}, sectionCardsSelector);

// Основной код
instanceSection.renderItems(); // создать шесть карточек
addListenersPopupEdit();
addListenersPopupNewCard();
addListenerPopupImage();
enableValidationAllForms();