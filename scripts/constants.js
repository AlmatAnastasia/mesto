// Добавление переменных card
const initialCards = [ // массив карточек
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
const elementTemplateCards = document.querySelector('.cards-template').content;
const elementSectionCards = document.querySelector('.cards__list');
const elementCard = elementTemplateCards.querySelector('.card');
// Добавление переменных popups (edit, new-card, image)
const elementTemplatePopups = document.querySelector('.popups-template').content;
const elementSectionPopups = document.querySelector('.popups');
const elementPopupEdit = elementTemplatePopups.querySelector('.popup_type_edit'); // Редактировать профиль
const elementPopupEditNameInput = elementPopupEdit.querySelector('.popup__input_type_name-text'); // поля формы в DOM
const elementPopupEditJobInput = elementPopupEdit.querySelector('.popup__input_type_description-text');
const elementPopupEditButton = document.querySelector('.profile__intro-edit-button');
const introTitle = document.querySelector('.profile__intro-title');
const introText = document.querySelector('.profile__intro-text');
const elementPopupNewCard = elementTemplatePopups.querySelector('.popup_type_new-card'); // Новое место
const elementPopupNewCardNameInput = elementPopupNewCard.querySelector('.popup__input_type_name-text');
const elementPopupNewCardLinkInput = elementPopupNewCard.querySelector('.popup__input_type_description-url');
const elementPopupNewCardButton = document.querySelector('.profile__add-button');
const elementPopupImage = elementTemplatePopups.querySelector('.popup_type_image'); // Превью