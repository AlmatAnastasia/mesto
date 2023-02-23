import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import {
    initialCards,
    sectionCardsSelector,
    settingsForCreateCard as settings,
    elementsForCreatePopups as elements,
    settingsForCreatePopupImage as settingsPopupImage,
    settingsForCreatePopups as selectors,
    settingsForValidation as config,
    popupFormValidators
} from './components/constants.js';
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

// Стрелочные функции
const handleCardImageClick = (card, cardImage, titleSelector) => { // обработчик просмотра изображения
    return () => {
        const instancePopupWithImage = new PopupWithImage(popupImageSelector, settingsPopupImage, card, cardImage, titleSelector); // создать экземпляр класса Popup
        instancePopupWithImage.open();
    };
};

const createCard = (name, link) => { // создать карточку
    const instanceCard = new Card({ name, link, handleCardImageClick }, settings); // создать экземпляр класса Card
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
}, sectionCardsSelector);

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
        const instanceSection = new Section({}, sectionCardsSelector); // создать экземпляр класса Section
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
    const instancePopup = new PopupWithImage(popupImageSelector, settingsPopupImage); // создать экземпляр класса Popup
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