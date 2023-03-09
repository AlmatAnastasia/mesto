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
    popupDeleteSelector: popupDeleteSelector
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
            introTitle.textContent = name;
            introText.textContent = about;
            profileAvatar.src = avatar;
            api.addPersonalID(_id);
            instanceSection.renderItems(cards);
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
        instancePopupWithImage.open(name, link, description);
    };
};

// Взаимодействие с сервером
const addNewLike = async (labelLike, id) => { // лайкнуть карточку
    const likes = await api
        .updateAddStatusLike(id)
        .then((res => {
            const { likes } = res;
            return likes.length;
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });

    labelLike.textContent = likes;
};

const deleteNewLike = async (labelLike, id) => { // убрать лайк
    const likes = await api
        .updateDeleteStatusLike(id)
        .then((res => {
            const { likes } = res;
            return likes.length;
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });

    labelLike.textContent = likes;
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
            instancePopupDelete.close(); // закрыть папап удаления карточки
            card.remove();
        })
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
}

// Стрелочные функции
const handlePopupDeleteSubmit = (card, cardID) => { // обработчик «отправки» формы (delete)
    return (evt) => {
        evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
        deleteOldCard(card, cardID); // удалить карточку
    }
};

const handleDeleteButtonClick = (card, cardID) => { // обработчик удаления карточки (card)
    return () => {
        instancePopupDelete.open(handlePopupDeleteSubmit, card, cardID);
        instancePopupDelete.setEventListeners();
    };
};

const createCard = (likes, _id, name, link, owner) => { // создать карточку
    const personalID = api.returnPersonalID();
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
        const { name, job } = instanceUserInfo.getUserInfo();
        popupEditNameInput.value = name; // добавить данные пользователя
        popupEditJobInput.value = job;
        instancePopupWithFormEdit.open();
    };
};

// Взаимодействие с сервером
const changeProfileInfo = (name, about, close, submitButton) => { // изменить собсвенную информацию (данные профиля) на сервере
    api
        .editProfileInfo(name, about)
        .then((res => {
            const { name, about } = res;
            instanceUserInfo.setUserInfo(name, about);
            close();
        }))
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
}

// Стрелочные функции
const handleFormEditSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (edit)
    return (evt) => {
        evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
        const submitButton = evt.target.querySelector('.popup__submit');
        submitButton.textContent = 'Сохранение...';
        const popupValues = submitHandler();
        const popupEditName = popupValues[popupNameInputSelector];
        const popupEditJob = popupValues[popupEditJobInputSelector];
        changeProfileInfo(popupEditName, popupEditJob, close, submitButton);
    }
};

const addListenersPopupEdit = () => { // добавить обработчики событий (edit)
    instancePopupWithFormEdit.setEventListeners();
    popupEditButton.addEventListener('click', handleOpenButtonPopupEditClick()); // прикрепить обработчик открытия попапа (edit)
};

const handleOpenButtonPopupNewCardClick = () => { // обработчик открытия попапа (new-card)
    return () => instancePopupWithFormNewCard.open();
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
            instanceSection.addItemIntoEnd(cardElement); // добавить карточку
            close();
        })
        .catch((error) => { // обработать ошибки
            console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
}

// Стрелочные функции
const handleFormNewCardSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (new-card)
    return (evt) => {
        evt.preventDefault();
        const submitButton = evt.target.querySelector('.popup__submit');
        submitButton.textContent = 'Сохранение...';
        const popupValues = submitHandler();
        const name = popupValues[popupNameInputSelector];
        const link = popupValues[popupNewCardLinkInputSelector];
        // логика вставки и логика создания
        addNewCard(name, link, close, submitButton); // создать карточку
    }
};

const addListenersPopupNewCard = () => { // добавить обработчики событий (new-card)
    instancePopupWithFormNewCard.setEventListeners();
    popupNewCardButton.addEventListener('click', handleOpenButtonPopupNewCardClick()); // прикрепить обработчик открытия попапа (new-card)
};

const handleOpenButtonPopupUpdateAvatarClick = () => { // обработчик открытия попапа (update-avatar)
    return () => instancePopupWithFormUpdateAvatar.open();
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
            submitButton.textContent = 'Сохранить';
        });
}

// Стрелочные функции
const handleFormUpdateAvatarSubmit = ({ close, submitHandler }) => { // обработчик «отправки» формы (update-avatar)
    return (evt) => {
        evt.preventDefault();
        const submitButton = evt.target.querySelector('.popup__submit');
        submitButton.textContent = 'Сохранение...';
        const popupValues = submitHandler();
        const avatar = popupValues[popupUpdateAvatarInputSelector];
        changeProfileAvatar(avatar, close, submitButton);
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
const instancePopupDelete = new PopupWithSubmit(popupDeleteSelector); // создать экземпляр класса Popup (popup_delete)
const instanceUserInfo = new UserInfo({ introTitleSelector, introTextSelector }); // создать экземпляр класса UserInfo
const instanceSection = new Section({ // создать экземпляр класса Section
    renderer: (item) => {
        // логика вставки и логика создания
        const { likes, _id, name, link, owner } = item;
        const cardElement = createCard(likes, _id, name, link, owner); // создать карточку
        instanceSection.addItem(cardElement); // добавить карточку
    }
}, sectionCardsSelector);
// Основной код
addInfoFromServer();
addListenersPopupEdit();
addListenersPopupNewCard();
addListenersPopupUpdateAvatar();
addListenerPopupImage();
enableValidationAllForms();