export default class Api { // класс Api, который загружает данные с сервера

    // конструктор принимает: baseUrl и headers (authorization, 'Content-Type')
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl; // адрес сервера и идентификатор группы
        this._authorization = headers.authorization; // личный токен
        this._type = headers['Content-Type']; // 'Content-Type'
    }

    // приватный метод
    _checkForErrors(res) { // проверить ответ на ошибки

        if (res.ok) { // проверить ответа
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклонить промис
        }
    }

    // публичные методы
    getInitialCards() { // загрузить карточки с сервера
        return fetch('https://nomoreparties.co/v1/cohort-61/cards', {
            headers: {
                authorization: this._authorization
            }
        })

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })
    }

    getProfileInfo() { // загрузить информацию о пользователе с сервера
        return fetch('https://nomoreparties.co/v1/cohort-61/users/me', {
            headers: {
                authorization: this._authorization
            }
        })

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })

    }

    editProfileInfo() { // редактировать профиль
        return fetch('https://nomoreparties.co/v1/cohort-61/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._type
            },
            body: JSON.stringify({
                name: 'Моргана Пендрагон',
                about: 'Верховная жрица, исследователь'
            })
        })

            .then(res => { // обработать результаты
                return this._checkForErrors(res);
            })

    }
}