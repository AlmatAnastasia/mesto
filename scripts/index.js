import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
<<<<<<< HEAD
import Popup from './Popup.js';
=======
>>>>>>> refactor/refactor-class
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
    initialCards,
<<<<<<< HEAD
=======
    sectionCardsSelector,
>>>>>>> refactor/refactor-class
    settingsForCreateCard as settings,
    elementsForCreatePopups as elements,
    settingsForCreatePopupImage as settingsPopupImage,
    settingsForCreatePopups as selectors,
<<<<<<< HEAD
    popupFormValidators,
    settingsForValidation as config
=======
    settingsForValidation as config,
    popupFormValidators
>>>>>>> refactor/refactor-class
} from './constants.js';
// Деструктурирующее присваивание (деструктуризация объекта)
const {
    popupEditFormElement: popupEditForm,
    popupEditButtonElement: popupEditButton,
    popupNewCardFormElement: popupNewCardForm,
    popupNewCardButtonElement: popupNewCardButton,
} = elements;
const {
    popupEditSelector: popupEditSelector, // Редактировать профиль
    popupEditNameInputSelector: popupEditNameInputSelector, // поля формы в DOM
    popupEditJobInputSelector: popupEditJobInputSelector,
    introTitleSelector: introTitleSelector, // поля профиля (информация о пользователе)
    introTextSelector: introTextSelector,
    popupNewCardSelector: popupNewCardSelector, // Новое место
    popupImageSelector: popupImageSelector, // Превью
} = selectors;

const {
    popupEditSelector: popupEditSelector, // Редактировать профиль
    popupEditNameInputSelector: popupEditNameInputSelector, // поля формы в DOM
    popupEditJobInputSelector: popupEditJobInputSelector,
    introTitleSelector: introTitleSelector, // поля профиля (информация о пользователе)
    introTextSelector: introTextSelector,
    popupNewCardSelector: popupNewCardSelector, // Новое место
    popupImageSelector: popupImageSelector, // Превью
} = selectors;

// Стрелочные функции
<<<<<<< HEAD
const handleCardImageClick = (card, cardImage, settings) => { // обработчик просмотра изображения
    return () => {
        const instancePopupWithImage = new PopupWithImage(popupImageSelector, settingsPopupImage, card, cardImage, settings); // создать экземпляр класса Popup
=======
const handleCardImageClick = (card, cardImage, titleSelector) => { // обработчик просмотра изображения
    return () => {
        const instancePopupWithImage = new PopupWithImage(popupImageSelector, settingsPopupImage, card, cardImage, titleSelector); // создать экземпляр класса Popup
>>>>>>> refactor/refactor-class
        instancePopupWithImage.open();
    };
};

const createCard = (name, link) => { // создать карточку
<<<<<<< HEAD
    const templateCardsSelector = settings.templateSelector;
    const instanceCard = new Card(name, link, templateCardsSelector, settings, handleCardImageClick); // создать экземпляр класса Card
=======
    const instanceCard = new Card({ name, link, handleCardImageClick }, settings); // создать экземпляр класса Card
>>>>>>> refactor/refactor-class
    const cardElement = instanceCard.generateCard(); // вернуть карточку
    return cardElement;
};

const initialCardList = new Section({ // создать экземпляр класса Section
    items: initialCards,
    renderer: (item) => {
        // логика вставки и логика создания
        const cardElement = createCard(item.name, item.link); // создать карточку
        initialCardList.addItem(cardElement); // добавить карточку
    }
<<<<<<< HEAD
}, settings.sectionCardsSelector);
=======
}, sectionCardsSelector);
>>>>>>> refactor/refactor-class

const handleOpenButtonPopupEditClick = (openPopupEdit) => { // обработчик открытия попапа (edit)
    return () => openPopupEdit();
};

const handleFormEditSubmit = ({ close, setInfo }) => { // обработчик «отправки» формы (edit)
    return (evt) => {
        evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
        setInfo();
        close();
    }
};

const addListenersPopupEdit = () => { // добавить обработчики событий (edit)
    const instanceUserInfo = new UserInfo(
        { introTitleSelector, introTextSelector },
        { popupEditNameInputSelector, popupEditJobInputSelector }
    ); // создать экземпляр класса UserInfo
    const getInfo = instanceUserInfo.getUserInfo.bind(instanceUserInfo);
    const setInfo = instanceUserInfo.setUserInfo.bind(instanceUserInfo);
    const instancePopupWithForm = new PopupWithForm(
        popupEditSelector,
        handleFormEditSubmit,
        setInfo,
        {
            clearPopup: () => { // очистить попап
                getInfo();
                // вызвать метод resetValidation экземпляра класса под именем формы
                popupFormValidators[popupEditForm.name].resetValidation(); // сбросить проверку
            }
        }
    ); // создать экземпляр класса Popup
    const openPopupEdit = instancePopupWithForm.open.bind(instancePopupWithForm);
    instancePopupWithForm.setEventListeners();
    popupEditButton.addEventListener('click', handleOpenButtonPopupEditClick(openPopupEdit)); // прикрепить обработчик открытия попапа (edit)
};

const handleOpenButtonPopupNewCardClick = (openPopupNewCard) => { // обработчик открытия попапа (new-card)
    return () => openPopupNewCard();
};

const handleFormNewCardSubmit = ({ close, setInfo }) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        evt.preventDefault();
        const { name, link } = setInfo();
<<<<<<< HEAD
        const instanceSection = new Section({}, settings.sectionCardsSelector); // создать экземпляр класса Section
=======
        const instanceSection = new Section({}, sectionCardsSelector); // создать экземпляр класса Section
>>>>>>> refactor/refactor-class
        // логика вставки и логика создания
        const cardElement = createCard(name, link); // создать карточку
        instanceSection.addItem(cardElement); // добавить карточку
        close();
    }
};

const addListenersPopupNewCard = () => { // добавить обработчики событий (new-card)
    const instancePopupWithForm = new PopupWithForm(
        popupNewCardSelector,
        handleFormNewCardSubmit,
        null,
        {
            clearPopup: () => { // очистить попап
                popupNewCardForm.reset();
                // вызвать метод resetValidation экземпляра класса под именем формы
                popupFormValidators[popupNewCardForm.name].resetValidation(); // сбросить проверку
            }
        }); // создать экземпляр класса Popup
    const openPopupNewCard = instancePopupWithForm.open.bind(instancePopupWithForm);
    instancePopupWithForm.setEventListeners();
    popupNewCardButton.addEventListener('click', handleOpenButtonPopupNewCardClick(openPopupNewCard)); // прикрепить обработчик открытия попапа (new-card)
};

const addListenerPopupImage = () => { // добавить обработчик события (image)
<<<<<<< HEAD
    const instancePopup = new Popup(popupImageSelector, settingsPopupImage); // создать экземпляр класса Popup
=======
    const instancePopup = new PopupWithImage(popupImageSelector, settingsPopupImage); // создать экземпляр класса Popup
>>>>>>> refactor/refactor-class
    instancePopup.setEventListeners();
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

// Основной код
initialCardList.renderItems(); // создать шесть карточек
addListenersPopupEdit();
addListenersPopupNewCard();
addListenerPopupImage();
enableValidationAllForms();