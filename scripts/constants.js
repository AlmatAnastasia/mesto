// Добавление переменных card
export const initialCards = [ // массив карточек
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
export const templateCardsSelector = '.cards-template';
export const elementSectionCards = document.querySelector('.cards__list');
// Объект настроек для создания карточки
export const settingsForCreateCard = {
    templateSelector: '.cards-template',
    sectionCardsSelector: '.cards__list',
    cardSelector: '.card',
    imageSelector: '.card__image',
    titleSelector: '.card__item-title',
    likeButtonSelector: '.card__item-like-button',
    deleteButtonSelector: '.card__delete-button',
};
// Добавление переменных popups (edit, new-card, image)
const elementSectionPopups = document.querySelector('.popups');
const elementPopupEdit = elementSectionPopups.querySelector('.popup_type_edit'); // Редактировать профиль
const elementPopupEditForm = elementPopupEdit.querySelector('.popup__form');
const elementPopupEditButton = document.querySelector('.profile__intro-edit-button');
const elementPopupNewCard = elementSectionPopups.querySelector('.popup_type_new-card'); // Новое место
const elementPopupNewCardForm = elementPopupNewCard.querySelector('.popup__form');
const elementPopupNewCardButton = document.querySelector('.profile__add-button');
// Объект элементов popups (edit, new-card)
export const elementsForCreatePopups = {
    popupEditFormElement: elementPopupEditForm,
    popupEditButtonElement: elementPopupEditButton,
    popupNewCardFormElement: elementPopupNewCardForm,
    popupNewCardButtonElement: elementPopupNewCardButton,
};
// Объект настроек popup (image)
export const settingsForCreatePopupImage = {
    popupImagePhotoSelector: '.popup__image',
    popupImageHeadingSelector: '.popup__heading'
};
// Объект настроек popups (edit, new-card, image)
export const settingsForCreatePopups = {
    popupEditSelector: '.popup_type_edit', // Редактировать профиль
    popupEditNameInputSelector: '.popup__input_type_name-text', // поля формы в DOM
    popupEditJobInputSelector: '.popup__input_type_description-text',
    introTitleSelector: '.profile__intro-title', // поля профиля (информация о пользователе)
    introTextSelector: '.profile__intro-text',
    popupNewCardSelector: '.popup_type_new-card', // Новое место
    popupImageSelector: '.popup_type_image', // Превью
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