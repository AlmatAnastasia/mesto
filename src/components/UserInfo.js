export default class UserInfo { // класс UserInfo, который отвечает за управление отображением информации о пользователе на странице

    // конструктор принимает объект с селекторами двух элементов
    constructor(
        { introTitleSelector: titleSelector, introTextSelector: textSelector },
        { popupEditNameInputSelector: nameInputSelector, popupEditJobInputSelector: jobInputSelector }
    ) {
        // приватные поля (переменные с this) экземпляра класса UserInfom
        this._title = document.querySelector(titleSelector); // элемент имени пользователя
        this._text = document.querySelector(textSelector); // элемент информации о себе
        this._name = document.querySelector(nameInputSelector);
        this._job = document.querySelector(jobInputSelector);
    }

    // публичные методы
    getUserInfo() { // вернуть объект с данными пользователя
        this._name.value = this._title.textContent;
        this._job.value = this._text.textContent;
    }

    setUserInfo() { // принять новые данные пользователя и добавить их на страницу
        this._title.textContent = this._name.value;
        this._text.textContent = this._job.value;
    }
}