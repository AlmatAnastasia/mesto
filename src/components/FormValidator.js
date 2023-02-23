export default class FormValidator { // класс FormValidator, который настраивает валидацию полей формы

    // конструктор принимает объект настроек и элемент формы
    constructor(settings, popupForm) {
        // приватные поля (переменные с this) экземпляра класса Card
        this._settings = settings; // Инкапсуляция
        this._popupForm = popupForm;
    }

    // приватные методы
    _hasInvalidInput() { // проверить наличие поля, которое не прошло валидацию
        return this._popupInputList.some((popupInput) => {
            return !popupInput.validity.valid;
        })
    } // вернуть true, если есть хотя бы одно поле, которое не прошло валидацию

    _makeButtonInactive() { // сделать кнопку неактивной
        this._popupButton.classList.add(this._settings.buttonClass.inactiveButtonClass);
        this._popupButton.classList.add(this._settings.buttonClass.inactiveIndicatorClass);
        this._popupButton.classList.remove(this._settings.buttonClass.indicatorClass);
        this._popupButton.disabled = true;
    }

    _makeButtonActive() { // сделать кнопку активной
        this._popupButton.classList.remove(this._settings.buttonClass.inactiveButtonClass);
        this._popupButton.classList.remove(this._settings.buttonClass.inactiveIndicatorClass);
        this._popupButton.classList.add(this._settings.buttonClass.indicatorClass);
        this._popupButton.disabled = false;
    }

    _toggleButtonState() { // проверить/переключить состояние кнопки
        if (this._hasInvalidInput()) { // если есть хотя бы одно поле, которое не проходит валидацию
            this._makeButtonInactive();
        } else { // если все поля проходят валидацию
            this._makeButtonActive();
        };
    }

    _showErrorMessage(popupInput, errorMessage) { // показать сообщение об ошибке
        const error = this._popupForm.querySelector(`.${popupInput.id}-error`); // элемент ошибки (span)
        error.classList.add(this._settings.errorClass.spanErrorClass);
        error.textContent = errorMessage;
    }

    _showInputError(popupInput, errorMessage) { // показать элемент ошибки
        popupInput.classList.add(this._settings.errorClass.inputErrorClass); // добавить класс с ошибкой
        this._showErrorMessage(popupInput, errorMessage);
    }

    _hideErrorMessage(popupInput) { // скрыть сообщение об ошибке
        const error = this._popupForm.querySelector(`.${popupInput.id}-error`); // элемент ошибки (span)
        error.classList.remove(this._settings.errorClass.spanErrorClass);
        error.textContent = '';
    }

    _hideInputError(popupInput) { // скрыть элемент ошибки
        popupInput.classList.remove(this._settings.errorClass.inputErrorClass); // удалить класс с ошибкой
        this._hideErrorMessage(popupInput);
    }

    _checkInputValidity(popupInput) { // проверить валидность поля
        if (!popupInput.validity.valid) { // если поле не проходит валидацию
            const errorMessage = popupInput.validationMessage; // текст ошибки 
            this._showInputError(popupInput, errorMessage);
        } else { // если поле проходит валидацию
            this._hideInputError(popupInput);
        };
    }

    _setEventListeners() { // добавить обработчики событий форме и её полям
        // приватные поля (переменные с this)
        this._popupInputList = Array.from(this._popupForm.querySelectorAll(this._settings.inputSelector)); // массив полей (инпутов)
        this._popupButton = this._popupForm.querySelector(this._settings.buttonSelector); //  кнопка отправки
        this._toggleButtonState(); // деактивация кнопки при первой загрузке сайта
        this._popupInputList.forEach((popupInput) => {
            popupInput.addEventListener('input', () => {
                this._checkInputValidity(popupInput);
                this._toggleButtonState(); // при изменении любого из полей
            });
        });
        this._popupForm.addEventListener('reset', () => { // обработчик reset для деактивации кнопки
            setTimeout(() => { // дождаться полной очистки формы и деактивировать кнопку
                this._toggleButtonState();
            }, 0);
        });
    }

    resetValidation() { // сбросить проверку (очистка ошибок и управление кнопкой при повторном открытии полей)
        this._toggleButtonState(); // управление кнопкой
        this._popupInputList.forEach((popupInput) => {
            this._hideInputError(popupInput); // скрыть элемент ошибки
        });
    }

    // публичный метод
    enableValidation() { // включить валидацию формы
        this._setEventListeners();
    }

}