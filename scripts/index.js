const editButton = document.querySelector('.profile__intro-edit-button');
const popupForm = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');

const introTitle = document.querySelector('.profile__intro-title');
const introText = document.querySelector('.profile__intro-text');

let formElement = document.querySelector('.popup__form'); // форма в DOM
let nameInput = document.querySelector('.popup__input_type_name-text'); // поля формы в DOM
let jobInput = document.querySelector('.popup__input_type_description-text');

// открыть и закрыть попап, placeholder

function switchPopup() {
    popupForm.classList.toggle('popup_opened');
}

editButton.addEventListener('click', function () {
    switchPopup(); // popupForm.classList.add('popup_opened');
    nameInput.value = introTitle.textContent;
    jobInput.value = introText.textContent;
});

closeButton.addEventListener('click', function () {
    switchPopup(); // popupForm.classList.remove('popup_opened');
});

// обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // отмена стандартной отправки формы (определение собственной логики отправки)
    introTitle.textContent = nameInput.value;
    introText.textContent = jobInput.value;
    switchPopup(); // popupForm.classList.remove('popup_opened');
}

// прикрепить обработчик к форме: будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);