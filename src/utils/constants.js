// Функционал смены текста в кнопке
export const renderLoading = (text) => {
    (text === 'Сохранить') ? text = 'Сохранение...' : text = 'Сохранить';
    return text;
};
// Добавление переменных card
export const sectionCardsSelector = '.cards__list';
// Объект настроек для создания карточки
export const settingsForCreateCard = {
    templateSelector: '.cards-template',
    cardSelector: '.card',
    imageSelector: '.card__image',
    titleSelector: '.card__item-title',
    labelLikeSelector: '.card__item-like-number',
    likeButtonSelector: '.card__item-like-button',
    deleteButtonSelector: '.card__delete-button',
};
// Добавление переменных popups (edit, new-card, image)
const elementSectionPopups = document.querySelector('.popups');
const elementPopupEdit = elementSectionPopups.querySelector('.popup_type_edit'); // Редактировать профиль
const elementPopupEditNameInput = elementPopupEdit.querySelector('.popup__input_type_name-text'); // поля формы в DOM
const elementPopupEditJobInput = elementPopupEdit.querySelector('.popup__input_type_description-text');
const elementPopupEditButton = document.querySelector('.profile__intro-edit-button');
const elementPopupNewCardButton = document.querySelector('.profile__add-button');
const elementPopupUpdateAvatarButton = document.querySelector('.profile__avatar-edit-button');
const elementProfileAvatar = document.querySelector('.profile__avatar');
// Объект элементов popups (edit, new-card, update-avatar)
export const elementsForCreatePopups = {
    popupEditNameInput: elementPopupEditNameInput,
    popupEditJobInput: elementPopupEditJobInput,
    popupEditButtonElement: elementPopupEditButton,
    popupNewCardButtonElement: elementPopupNewCardButton,
    popupUpdateAvatarButtonElement: elementPopupUpdateAvatarButton,
    profileAvatarElement: elementProfileAvatar,
};
// Объект настроек popup (image)
export const settingsForCreatePopupImage = {
    popupImagePhotoSelector: '.popup__image',
    popupImageHeadingSelector: '.popup__heading'
};
// Объект настроек popups (edit, new-card, update-avatar, image)
export const settingsForCreatePopups = {
    popupEditSelector: '.popup_type_edit', // Редактировать профиль
    introTitleSelector: '.profile__intro-title', // поля профиля (информация о пользователе)
    introTextSelector: '.profile__intro-text',
    popupNewCardSelector: '.popup_type_new-card', // Новое место
    popupNameInputSelector: 'popup__input_type_name-text', // поля формы в DOM
    popupEditJobInputSelector: 'popup__input_type_description-text',
    popupNewCardLinkInputSelector: 'popup__input_type_description-url',
    popupUpdateAvatarSelector: '.popup_type_update-avatar',
    popupUpdateAvatarInputSelector: 'popup__input_type_description-url',
    popupImageSelector: '.popup_type_image', // Превью
    popupDeleteSelector: '.popup_type_delete',
    buttonSubmitSelector: '.popup__submit'
};
// Объект настроек для валидации форм
export const settingsForValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__submit',
    buttonClass: {
        inactiveButtonClass: 'popup__submit_disabled',
        indicatorClass: 'indicator',
        inactiveIndicatorClass: 'indicator_disabled'
    },
    errorClass: {
        inputErrorClass: 'popup__input_type_error',
        spanErrorClass: 'popup__input-error'
    }
};
// Пустой объект экземпляров класса FormValidator
export const popupFormValidators = {};