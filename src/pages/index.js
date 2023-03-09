import './index.css';
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
    renderLoading,
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
    popupDeleteSelector: popupDeleteSelector,
    buttonSubmitSelector: buttonSubmitSelector
} = selectors;

// Взаимодействие с сервером
const addInfoFromServer = () => {
    // добавить информацию о пользователе с сервера
    // загрузить карточки с сервера
    const promises = [api.getProfileInfo(), api.getInitialCards()]; // массив промисов
    Promise.all(promises)

        .then((results => {
            const [info, cards] = results;
            const { name, about, avatar, _id } = info;
            userInfo.setUserInfo(name, about);
            profileAvatar.src = avatar;
            userInfo.addPersonalID(_id);
            section.renderItems(cards);
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
}

// Стрелочные функции
const handleCardImageClick = (card, cardImage, titleSelector) => { // обработчик просмотра изображения (card)
    return () => {
        const name = card.querySelector(titleSelector).textContent;
        const link = cardImage.src;
        const description = cardImage.alt;
        popupWithImage.open(name, link, description);
    };
};

// Взаимодействие с сервером
const addNewLike = (labelLike, id) => { // лайкнуть карточку
    api
        .updateAddStatusLike(id)
        .then((res => {
            const { likes } = res;
            labelLike.textContent = likes.length;
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
};

const deleteNewLike = (labelLike, id) => { // убрать лайк
    api
        .updateDeleteStatusLike(id)
        .then((res => {
            const { likes } = res;
            labelLike.textContent = likes.length;
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
};

// Стрелочные функции
const handleLikeButtonClick = (id, labelLike) => { // обработчик лайка карточки (card)
    return (evt) => {
        const likeButton = evt.target;
        const likeStatus = likeButton.classList.contains('card__item-like-button_active');
        (likeStatus === false) ? addNewLike(labelLike, id) : deleteNewLike(labelLike, id);
        likeButton.classList.toggle('card__item-like-button_active'); // лайк карточки
    }
};

// Взаимодействие с сервером
const deleteOldCard = (card, cardID) => { // удалить карточку
    api
        .deleteCard(cardID)
        .then(() => {
            popupDelete.close(); // закрыть папап удаления карточки
            card.remove();
        })
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
}

// Стрелочные функции
const handleDeleteButtonClick = (card, cardID) => { // обработчик удаления карточки (card)
    return () => {
        popupDelete.open(deleteOldCard, card, cardID);
    }
};

const createCard = (likes, _id, name, link, owner) => { // создать карточку
    const personalID = userInfo.returnPersonalID();
    const ownerID = owner._id;
    const instanceCard = new Card({
        data: { likes, _id, name, link, personalID, ownerID }, // данные карточки (включая информацию по лайкам)
        methods: {
            handleCardImageClick, // обработчик просмотра изображения
            handleLikeButtonClick, // обработчик лайка карточки
            handleDeleteButtonClick, // обработчик удаления карточки
        },
        settings
    }); // создать экземпляр класса Card
    const cardElement = instanceCard.generateCard(); // вернуть карточку
    return cardElement;
};

// Стрелочные функции
const handleOpenButtonPopupEditClick = () => { // обработчик открытия попапа (edit)
    return () => {
        const { name, job } = userInfo.getUserInfo();
        popupEditNameInput.value = name; // добавить данные пользователя
        popupEditJobInput.value = job;
        popupWithFormEdit.open();
    };
};

// Взаимодействие с сервером
const changeProfileInfo = (name, about, close, submitButton) => { // изменить собственную информацию (данные профиля) на сервере
    api
        .editProfileInfo(name, about)
        .then((res => {
            const { name, about } = res;
            userInfo.setUserInfo(name, about);
            close();
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        })
        .finally(() => {
            submitButton.textContent = renderLoading(submitButton.textContent);
        });
}

// Стрелочные функции
const handleFormEditSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (edit)
    return (evt) => {
        evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
        const submitButton = evt.target.querySelector(buttonSubmitSelector);
        submitButton.textContent = renderLoading(submitButton.textContent);
        const popupValues = submitHandler();
        const popupEditName = popupValues[popupNameInputSelector];
        const popupEditJob = popupValues[popupEditJobInputSelector];
        changeProfileInfo(popupEditName, popupEditJob, close, submitButton);
    }
};

const addListenersPopupEdit = () => { // добавить обработчики событий (edit)
    popupWithFormEdit.setEventListeners();
    popupEditButton.addEventListener('click', handleOpenButtonPopupEditClick()); // прикрепить обработчик открытия попапа (edit)
};

const handleOpenButtonPopupNewCardClick = () => { // обработчик открытия попапа (new-card)
    return () => popupWithFormNewCard.open();
};

// Взаимодействие с сервером
const addNewCard = (name, link, close, submitButton) => {
    // добавить новую карточку на сервер
    // загрузить карточки с сервера
    api
        .addCard(name, link)
        .then((res) => {
            const { likes, _id, name, link, owner } = res;
            const cardElement = createCard(likes, _id, name, link, owner); // создать карточку
            section.addItem(cardElement); // добавить карточку
            close();
        })
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        })
        .finally(() => {
            submitButton.textContent = renderLoading(submitButton.textContent);
        });
}

// Стрелочные функции
const handleFormNewCardSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        evt.preventDefault();
        const submitButton = evt.target.querySelector(buttonSubmitSelector);
        submitButton.textContent = renderLoading(submitButton.textContent);
        const popupValues = submitHandler();
        const name = popupValues[popupNameInputSelector];
        const link = popupValues[popupNewCardLinkInputSelector];
        // логика вставки и логика создания
        addNewCard(name, link, close, submitButton); // создать карточку
    }
};

const addListenersPopupNewCard = () => { // добавить обработчики событий (new-card)
    popupWithFormNewCard.setEventListeners();
    popupNewCardButton.addEventListener('click', handleOpenButtonPopupNewCardClick()); // прикрепить обработчик открытия попапа (new-card)
};

const handleOpenButtonPopupUpdateAvatarClick = () => { // обработчик открытия попапа (update-avatar)
    return () => popupWithFormUpdateAvatar.open();
};

// Взаимодействие с сервером
const changeProfileAvatar = (avatar, close, submitButton) => {  // изменить собсвенную информацию (аватар пользователя)
    api
        .editProfileAvatar(avatar)
        .then((res => {
            const { avatar } = res;
            profileAvatar.src = avatar;
            close();
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        })
        .finally(() => {
            submitButton.textContent = renderLoading(submitButton.textContent);
        });
}

// Стрелочные функции
const handleFormUpdateAvatarSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (update-avatar)
    return (evt) => {
        evt.preventDefault();
        const submitButton = evt.target.querySelector(buttonSubmitSelector);
        submitButton.textContent = renderLoading(submitButton.textContent);
        const popupValues = submitHandler();
        const avatar = popupValues[popupUpdateAvatarInputSelector];
        changeProfileAvatar(avatar, close, submitButton);
    }
};

const addListenersPopupUpdateAvatar = () => { // добавить обработчики событий (update-avatar)
    popupWithFormUpdateAvatar.setEventListeners();
    popupUpdateAvatarButton.addEventListener('click', handleOpenButtonPopupUpdateAvatarClick()); // прикрепить обработчик открытия попапа (new-card)
};

const addListenerPopupImage = () => { // добавить обработчик события (image)
    popupWithImage.setEventListeners();
};

const addListenerPopupDelete = () => { // добавить обработчик события (delete)
    popupDelete.setEventListeners();
}

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
const popupWithFormEdit = new PopupWithForm(
    popupEditSelector,
    handleFormEditSubmit,
    popupFormValidators // объект экземпляров класса FormValidator
); // создать экземпляр класса PopupWithForm (edit)
const popupWithFormNewCard = new PopupWithForm(
    popupNewCardSelector,
    handleFormNewCardSubmit,
    popupFormValidators // объект экземпляров класса FormValidator
); // создать экземпляр класса PopupWithForm (new-card)
const popupWithFormUpdateAvatar = new PopupWithForm(
    popupUpdateAvatarSelector,
    handleFormUpdateAvatarSubmit,
    popupFormValidators // объект экземпляров класса FormValidator
); // создать экземпляр класса PopupWithForm (update-avatar)
const popupWithImage = new PopupWithImage(popupImageSelector, settingsPopupImage); // создать экземпляр класса PopupWithImage
const popupDelete = new PopupWithSubmit(popupDeleteSelector); // создать экземпляр класса Popup (popup_delete)
const userInfo = new UserInfo({ introTitleSelector, introTextSelector }); // создать экземпляр класса UserInfo
const section = new Section({ // создать экземпляр класса Section
    renderer: (item) => {
        // логика вставки и логика создания
        const { likes, _id, name, link, owner } = item;
        const cardElement = createCard(likes, _id, name, link, owner); // создать карточку
        section.addItem(cardElement); // добавить карточку
    }
}, sectionCardsSelector);
// Основной код
addInfoFromServer();
addListenersPopupEdit();
addListenersPopupNewCard();
addListenersPopupUpdateAvatar();
addListenerPopupImage();
addListenerPopupDelete();
enableValidationAllForms();