const initialCards = [ // объект карточек
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
// Добавление template-элементов
const getElementTemplateCards = document.querySelector('.cards-template').content;
let getElementSectionCards = document.querySelector('.cards__list');
const getElementTemplatePopup = document.querySelector('.popup-template').content;
// Объект с переназначаемыми после создания попапа переменными (edit, new-card, image)
let popupLetElements = [
    {
        nameInput: null, // поля формы в DOM
        jobInput: null,
        closeButton: null,
        formElement: null // форма в DOM
    }, {
        nameInput: null,
        jobInput: null,
        closeButton: null,
        formElement: null
    }, {
        closeButton: null,
        formElement: null,
    }
];
// Объект с независящими от создания попапа переменными (edit, new-card, image)
let popupConstElements = [
    {
        button: document.querySelector('.profile__intro-edit-button'),
        popupForm: document.querySelector('.popup_type_edit'), // Редактировать профиль
        popupHeadingText: 'Редактировать профиль',
        popupSubmit: 'Сохранить',
        introTitle: document.querySelector('.profile__intro-title'),
        introText: document.querySelector('.profile__intro-text')
    }, {
        button: document.querySelector('.profile__add-button'),
        popupForm: document.querySelector('.popup_type_new-card'), // Новое место
        popupHeadingText: 'Новое место',
        popupSubmit: 'Создать',
        introTitle: 'Название',
        introText: 'Ссылка на картинку'
    }, {
        popupForm: document.querySelector('.popup_type_image'),
    }
];

// Стрелочные функции
const findElement = (where, elem) => where.querySelector(elem); // вернуть первый элемент
const addElemAttribute = (elem, attr, text) => { elem[attr] = text; }; // добавить атрибут (alt, src, textContent)
const binarySwitch = (elem, className) => elem.classList.toggle(className); // переключатель
const addClass = (elem, className) => elem.classList.add(className); // добавить класс

// Функции
function insertCard(len, where, elem) { // добавить карточку (метод вставки)
    if (len <= 6) {
        where.append(elem);
    } else {
        where.prepend(elem);
    };
};

function createCard(name, job) { // создать карточку
    const cloneElementTemplateCards = getElementTemplateCards.cloneNode(true); // template элемент
    const cardsName = name; // заголовок и ссылка
    const cardsLink = job;
    let cardImage = findElement(cloneElementTemplateCards, '.card__image');
    let cardTitle = findElement(cloneElementTemplateCards, '.card__item-title');
    addElemAttribute(cardImage, 'alt', `Фотография - ${cardsName}`);
    addElemAttribute(cardImage, 'src', cardsLink);
    addElemAttribute(cardTitle, 'textContent', cardsName);
    insertCard(getElementSectionCards.children.length + 1, getElementSectionCards, cloneElementTemplateCards);
    cardImage.onerror = function () {
        alert("Ошибка во время загрузки изображения");
        findElement(getElementSectionCards, '.card').remove();
    };
};

function changeLike() { // лайк карточки
    getElementSectionCards.addEventListener('click', function (evt) { // делегирование событий
        if (evt.target.name === 'like-button') {
            let likeButton = evt.target;
            binarySwitch(likeButton, 'card__item-like-button_active');
        };
    });
};

function deleteCard() { // удалить карточку
    getElementSectionCards.addEventListener('click', function (evt) { // делегирование событий
        if (evt.target.name === 'delete-button') {
            let card = evt.target.parentElement;
            card.remove();
        };
    });
};

function fillPopupLetElements(cloneStart, number) { // заполнить объект popupLetElements
    if (number !== 2) {
        popupLetElements[number].nameInput = findElement(cloneStart, '.popup__input_type_name-text'); // поля формы в DOM
        popupLetElements[number].jobInput = findElement(cloneStart, '.popup__input_type_description-text');
    };
    popupLetElements[number].closeButton = findElement(cloneStart, '.popup__close-button');
    popupLetElements[number].formElement = findElement(cloneStart, '.popup__form'); // форма в DOM
};

function createPopup(end, number) { // создать попап (edit, new-card)
    const cloneStart = getElementTemplatePopup.cloneNode(true); // template элемент
    let popupHeading = findElement(cloneStart, '.popup__form-heading');
    let popupSubmit = findElement(cloneStart, '.popup__submit');
    fillPopupLetElements(cloneStart, number);
    addElemAttribute(popupHeading, 'textContent', popupConstElements[number].popupHeadingText);
    addElemAttribute(popupSubmit, 'textContent', popupConstElements[number].popupSubmit);
    end.append(cloneStart);
}

function removeForm(number) { // удалить форму
    popupLetElements[number].formElement.remove();
};

function switchPopup(number) { // добавить или удалить классы
    binarySwitch(popupConstElements[number].popupForm, 'popup_opened');
    binarySwitch(popupConstElements[number].popupForm, 'popup_smooth');
};

function switchPopupRemove(number) { // закрыть попап
    popupConstElements[number].popupForm.style = 'opacity: 0;';
    setTimeout(() => {
        if (number === 2) { removeForm(number); }
        switchPopup(number);
    }, 1500);
};

function addEventCloseButton(closeButton, number) { // закрыть попап при нажатии на кнопку
    closeButton.addEventListener('click', function () {
        switchPopupRemove(number); // popupForm.classList.remove('popup_opened');
    });
};

function switchPopupAdd(number) { // открыть попап
    let index = popupConstElements[number].popupForm.style['opacity'];
    if (index === '0') { popupConstElements[number].popupForm.style.opacity = 1 };
    switchPopup(number);
};
function handleFormSubmitEdit(evt) { // обработчик «отправки» формы
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    addElemAttribute(popupConstElements[0].introTitle, 'textContent', popupLetElements[0].nameInput.value);
    addElemAttribute(popupConstElements[0].introText, 'textContent', popupLetElements[0].jobInput.value);
    switchPopupRemove(0); // popupForm.classList.remove('popup_opened');
}

function handleFormSubmitNewCard(evt) {
    evt.preventDefault();
    let nameInput = popupLetElements[1].nameInput.value;
    let jobInput = popupLetElements[1].jobInput.value;
    createCard(nameInput, jobInput); // добавить карточку
    switchPopupRemove(1);
}

function createPopupImage(end, number, card) { // создать попап (image)
    const cloneStart = getElementTemplatePopup.cloneNode(true); // template элемент
    let cardImage = findElement(card, '.card__image').cloneNode(true);
    let popupHeading = findElement(card, '.card__item-title').cloneNode(true).textContent;
    let popupInfo = findElement(cloneStart, '.popup__info');
    let popupSubmit = findElement(cloneStart, '.popup__submit');
    let popupForm = findElement(cloneStart, '.popup__form');
    let popupFormHeading = findElement(cloneStart, '.popup__form-heading');
    let popupContainer = findElement(cloneStart, '.popup__container');
    fillPopupLetElements(cloneStart, number);
    popupInfo.remove();
    popupSubmit.remove();
    popupForm.prepend(cardImage);
    popupFormHeading.textContent = popupHeading;
    addClass(popupContainer, 'popup__container_big-image');
    addClass(cardImage, 'card__image_big-image');
    addClass(popupFormHeading, 'popup__form-heading_big-image');
    end.append(cloneStart);
}

function addListeners(number) { // добавить обработчики событий
    if (number !== 2) {
        popupConstElements[number].button.addEventListener('click', function () {
            switchPopupAdd(number); // popupForm.classList.add('popup_opened');
            popupLetElements[number].nameInput.value = popupConstElements[number].introTitle.textContent; // placeholder
            popupLetElements[number].jobInput.value = popupConstElements[number].introText.textContent;
            if (number === 1) {
                popupLetElements[number].nameInput.value = popupConstElements[number].introTitle;
                popupLetElements[number].jobInput.value = popupConstElements[number].introText;
            }

            // прикрепить обработчик к форме: будет следить за событием “submit” - «отправка»
            if (number === 0) {
                popupLetElements[number].formElement.addEventListener('submit', handleFormSubmitEdit);
            } else if (number === 1) {
                popupLetElements[number].formElement.addEventListener('submit', handleFormSubmitNewCard);
            };
        });
    } else {
        getElementSectionCards.addEventListener('click', function (evt) { // делегирование событий
            if (evt.target.className === 'card__image') {
                let card = evt.target.parentElement;
                createPopupImage(popupConstElements[number].popupForm, number, card);
                switchPopupAdd(number); // popupForm.classList.add('popup_opened');
                addEventCloseButton(popupLetElements[number].closeButton, number);
            };
        });
    };
};

function getNumberPopup() { // получить номер попапа
    for (let i = 0; i <= 2; i += 1) { // 0 - edit, 1 - new-card, 2 - image
        if (i === 2) {
            addListeners(i);
        } else {
            createPopup(popupConstElements[i].popupForm, i);
            addEventCloseButton(popupLetElements[i].closeButton, i);
            addListeners(i);
        };
    };
};

// Основной код
initialCards.forEach((item) => { // создать шесть карточек
    createCard(item.name, item.link); // заголовок и ссылка
});
changeLike();
deleteCard();
getNumberPopup();