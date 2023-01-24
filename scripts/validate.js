// Стрелочные функции
const returnFirstElement = (where, elem) => where.querySelector(elem); // вернуть первый элемент
const returnAllElements = (where, elem) => where.querySelectorAll(elem); // вернуть все элементы

const hasInvalidInput = (popupInputList) => { // проверить наличие поля, которое не прошло валидацию
    return popupInputList.some((popupInput) => {
        return !popupInput.validity.valid;
    });
}; // вернуть true, если есть хотя бы одно поле, которое не прошло валидацию

const makeButtonInactive = (popupButton, { inactiveButtonClass, indicatorClass, inactiveIndicatorClass }) => { // сделать кнопку неактивной
    popupButton.classList.add(inactiveButtonClass);
    popupButton.classList.add(inactiveIndicatorClass);
    popupButton.classList.remove(indicatorClass);
};

const makeButtonActive = (popupButton, { inactiveButtonClass, indicatorClass, inactiveIndicatorClass }) => { // сделать кнопку активной
    popupButton.classList.remove(inactiveButtonClass);
    popupButton.classList.remove(inactiveIndicatorClass);
    popupButton.classList.add(indicatorClass);
};

const toggleButtonState = (popupInputList, popupButton, buttonClass) => { // проверить/переключить состояние кнопки
    if (hasInvalidInput(popupInputList)) { // если есть хотя бы одно поле, которое не проходит валидацию
        makeButtonInactive(popupButton, buttonClass);
    } else { // если все поля проходят валидацию
        makeButtonActive(popupButton, buttonClass);
    };
};

const showErrorMessage = (popupForm, popupInput, errorMessage, errorClass) => { // показать сообщение об ошибке
    const error = returnFirstElement(popupForm, `.${popupInput.id}-error`); // элемент ошибки (span)
    error.classList.add(errorClass);
    error.textContent = errorMessage;
};

const showInputError = (popupForm, popupInput, errorMessage, { inputErrorClass, errorClass }) => { // показать элемент ошибки
    popupInput.classList.add(inputErrorClass); // добавить класс с ошибкой
    showErrorMessage(popupForm, popupInput, errorMessage, errorClass);
};

const hideErrorMessage = (popupForm, popupInput, errorClass) => { // скрыть сообщение об ошибке
    const error = returnFirstElement(popupForm, `.${popupInput.id}-error`); // элемент ошибки (span)
    error.classList.remove(errorClass);
    error.textContent = '';
};

const hideInputError = (popupForm, popupInput, { inputErrorClass, errorClass }) => { // скрыть элемент ошибки
    popupInput.classList.remove(inputErrorClass); // удалить класс с ошибкой
    hideErrorMessage(popupForm, popupInput, errorClass);
};

const checkInputValidity = (popupForm, popupInput, restData) => { // проверить валидность поля
    if (!popupInput.validity.valid) { // если поле не проходит валидацию
        const errorMessage = popupInput.validationMessage; // текст ошибки 
        showInputError(popupForm, popupInput, errorMessage, restData);
    } else { // если поле проходит валидацию
        hideInputError(popupForm, popupInput, restData);
    };
};

const setEventListeners = (popupForm, { inputSelector, buttonSelector, buttonClass, errorClass }) => { // добавить обработчики событий форме и её полям
    const popupInputList = Array.from(returnAllElements(popupForm, inputSelector)); // массив полей (инпутов)
    const popupButton = returnFirstElement(popupForm, buttonSelector); //  кнопка отправки
    toggleButtonState(popupInputList, popupButton, buttonClass); // в самом начале
    popupInputList.forEach((popupInput) => {
        popupInput.addEventListener('input', function () {
            checkInputValidity(popupForm, popupInput, errorClass);
            toggleButtonState(popupInputList, popupButton, buttonClass); // при изменении любого из полей
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => { // включить валидацию всех форм
    const popupFormList = Array.from(returnAllElements(document, formSelector)); // массив форм
    popupFormList.forEach((popupForm) => {
        setEventListeners(popupForm, rest);
    });
};

// Основной код
enableValidation(selectorsForValidation);