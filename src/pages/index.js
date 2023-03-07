import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
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
    popupUpdateAvatarButtonElement: popupUpdateAvatarButton,
    profileAvatarElement: profileAvatar,
    introTitleElement: introTitle,
    introTextElement: introText
} = elements;
const {
    popupEditSelector: popupEditSelector, // Редактировать профиль
    introTitleSelector: introTitleSelector, // поля профиля (информация о пользователе)
    introTextSelector: introTextSelector,
    popupNewCardSelector: popupNewCardSelector, // Новое место
    popupNameInputSelector: popupNameInputSelector, // поля формы в DOM
    popupEditJobInputSelector: popupEditJobInputSelector,
    popupNewCardLinkInputSelector: popupNewCardLinkInputSelector,
    popupUpdateAvatarSelector: popupUpdateAvatarSelector,
    popupUpdateAvatarInputSelector: popupUpdateAvatarInputSelector,
    popupImageSelector: popupImageSelector, // Превью
} = selectors;

// Профиль

// Стрелочные функции
const addProfileInfo = () => { // добавить информацию о пользователе с сервера
    api
        .getProfileInfo()
        .then((res => {
            const { name, about, avatar } = res;
            introTitle.textContent = name;
            introText.textContent = about;
            profileAvatar.src = avatar;
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
}

const addCards = async () => { // загрузить карточки с сервера
    const items = await api
        .getInitialCards()
        .then((res => { return res }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });

    const instanceSection = new Section({ // создать экземпляр класса Section
        items,
        renderer: (item) => {
            // логика вставки и логика создания
            const { likes, _id, name, link, owner, createdAt } = item;
            const cardElement = createCard(name, link); // создать карточку
            instanceSection.addItem(cardElement); // добавить карточку
        }
    }, sectionCardsSelector);
    instanceSection.renderItems();
}

const changeProfileInfo = () => { // изменить собсвенную информацию (данные профиля) на сервере
    api
        .editProfileInfo()
        .then((res => { return res; }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
}

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
        popupEditNameInput.value = name; // добавить данные пользователя
        popupEditJobInput.value = job;
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

const handleOpenButtonPopupUpdateAvatarClick = () => { // обработчик открытия попапа (update-avatar)
    return () => instancePopupWithFormUpdateAvatar.open();
};

const handleFormUpdateAvatarSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (update-avatar)
    return (evt) => {
        evt.preventDefault();
        const popupValues = submitHandler();
        profileAvatar.src = popupValues[popupUpdateAvatarInputSelector];
        close();
    }
};

const addListenersPopupUpdateAvatar = () => { // добавить обработчики событий (update-avatar)
    instancePopupWithFormUpdateAvatar.setEventListeners();
    popupUpdateAvatarButton.addEventListener('click', handleOpenButtonPopupUpdateAvatarClick()); // прикрепить обработчик открытия попапа (new-card)
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
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61', // адрес сервера и идентификатор группы
    headers: {
        authorization: 'e34a8857-3580-4e3d-82f5-9114588dd5f8', // личный токен
        'Content-Type': 'application/json'
    }
});
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
const instancePopupWithFormUpdateAvatar = new PopupWithForm(
    popupUpdateAvatarSelector,
    handleFormUpdateAvatarSubmit,
    popupFormValidators // объект экземпляров класса FormValidator
); // создать экземпляр класса PopupWithForm (update-avatar)
const instancePopupWithImage = new PopupWithImage(popupImageSelector, settingsPopupImage); // создать экземпляр класса PopupWithImage
const instanceUserInfo = new UserInfo({ introTitleSelector, introTextSelector }); // создать экземпляр класса UserInfo

// Основной код
addProfileInfo();
addCards();
changeProfileInfo();
addListenersPopupEdit();
addListenersPopupNewCard();
addListenersPopupUpdateAvatar();
addListenerPopupImage();
enableValidationAllForms();