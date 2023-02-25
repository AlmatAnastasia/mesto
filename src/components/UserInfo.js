export default class UserInfo { // класс UserInfo, который отвечает за управление отображением информации о пользователе на странице

    // конструктор принимает объект с селекторами двух элементов
    constructor({ introTitleSelector: titleSelector, introTextSelector: textSelector }) {
        // приватные поля (переменные с this) экземпляра класса UserInfom
        this._title = document.querySelector(titleSelector); // элемент имени пользователя
        this._text = document.querySelector(textSelector); // элемент информации о себе
    }

    // публичные методы
    getUserInfo() { // вернуть объект с данными пользователя
        const data = { name: this._title.textContent, job: this._text.textContent };
        return data;
    }

    setUserInfo(name, job) { // принять новые данные пользователя и добавить их на страницу
        this._title.textContent = name;
        this._text.textContent = job;
    }
}