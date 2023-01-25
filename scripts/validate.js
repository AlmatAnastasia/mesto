// Стрелочные функции
const hasInvalidInput = (popupInputList) => { // проверить наличие поля, которое не прошло валидацию
    return popupInputList.some((popupInput) => {
        return !popupInput.validity.valid;
    });
}; // вернуть true, если есть хотя бы одно поле, которое не прошло валидацию

const makeButtonInactive = (popupButton, settings) => { // сделать кнопку неактивной
    popupButton.classList.add(settings.buttonClass.inactiveButtonClass);
    popupButton.classList.add(settings.buttonClass.inactiveIndicatorClass);
    popupButton.classList.remove(settings.buttonClass.indicatorClass);
    popupButton.disabled = true;
};

const makeButtonActive = (popupButton, settings) => { // сделать кнопку активной
    popupButton.classList.remove(settings.buttonClass.inactiveButtonClass);
    popupButton.classList.remove(settings.buttonClass.inactiveIndicatorClass);
    popupButton.classList.add(settings.buttonClass.indicatorClass);
    popupButton.disabled = false;
};

const toggleButtonState = (popupInputList, popupButton, settings) => { // проверить/переключить состояние кнопки
    if (hasInvalidInput(popupInputList)) { // если есть хотя бы одно поле, которое не проходит валидацию
        makeButtonInactive(popupButton, settings);
    } else { // если все поля проходят валидацию
        makeButtonActive(popupButton, settings);
    };
};

const showErrorMessage = (popupForm, popupInput, errorMessage, settings) => { // показать сообщение об ошибке
    const error = popupForm.querySelector(`.${popupInput.id}-error`); // элемент ошибки (span)
    error.classList.add(settings.errorClass.spanErrorClass);
    error.textContent = errorMessage;
};

const showInputError = (popupForm, popupInput, errorMessage, settings) => { // показать элемент ошибки
    popupInput.classList.add(settings.errorClass.inputErrorClass); // добавить класс с ошибкой
    showErrorMessage(popupForm, popupInput, errorMessage, settings);
};

const hideErrorMessage = (popupForm, popupInput, settings) => { // скрыть сообщение об ошибке
    const error = popupForm.querySelector(`.${popupInput.id}-error`); // элемент ошибки (span)
    error.classList.remove(settings.errorClass.spanErrorClass);
    error.textContent = '';
};

const hideInputError = (popupForm, popupInput, settings) => { // скрыть элемент ошибки
    popupInput.classList.remove(settings.errorClass.inputErrorClass); // удалить класс с ошибкой
    hideErrorMessage(popupForm, popupInput, settings);
};

const checkInputValidity = (popupForm, popupInput, settings) => { // проверить валидность поля
    if (!popupInput.validity.valid) { // если поле не проходит валидацию
        const errorMessage = popupInput.validationMessage; // текст ошибки 
        showInputError(popupForm, popupInput, errorMessage, settings);
    } else { // если поле проходит валидацию
        hideInputError(popupForm, popupInput, settings);
    };
};

const setEventListeners = (popupForm, settings) => { // добавить обработчики событий форме и её полям
    const popupInputList = Array.from(popupForm.querySelectorAll(settings.inputSelector)); // массив полей (инпутов)
    const popupButton = popupForm.querySelector(settings.buttonSelector); //  кнопка отправки
    toggleButtonState(popupInputList, popupButton, settings); // деактивация кнопки при первой загрузке сайта
    popupInputList.forEach((popupInput) => {
        popupInput.addEventListener('input', () => {
            checkInputValidity(popupForm, popupInput, settings);
            toggleButtonState(popupInputList, popupButton, settings); // при изменении любого из полей
        });
    });
    popupForm.addEventListener('reset', () => { // обработчик reset для деактивации кнопки
        setTimeout(() => { // дождаться полной очистки формы и деактивировать кнопку
            toggleButtonState(popupInputList, popupButton, settings);
        }, 0);
    });
};

const enableValidation = ({ formSelector, ...rest }) => { // включить валидацию всех форм
    const popupFormList = Array.from(document.querySelectorAll(formSelector)); // массив форм
    popupFormList.forEach((popupForm) => {
        setEventListeners(popupForm, rest);
    });
};

// Основной код
enableValidation(settingsForValidation);