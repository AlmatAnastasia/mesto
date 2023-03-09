export default class Section { // класс Section, который отвечает за отрисовку элементов на странице

    // конструктор принимает два параметра: объект с двумя свойствами и селектор контейнера 
    constructor({ renderer }, sectionCardsSelector) {
        // приватные поля (переменные с this) экземпляра класса Section
        this._renderer = renderer; // функция (создание и отрисовка данных на странице)
        this._sectionCards = document.querySelector(sectionCardsSelector); // селектор контейнера
    }

    // публичные методы
    renderItems(items) { // отрисовать все элементы (массив данных)
        items.forEach((item) => { // создать шесть карточек
            this._renderer(item); // создать карточку
        });
    }

    addItem(elem) { // добавить элемент в контейнер
        this._sectionCards.prepend(elem); // вставить в начало элемента (метод вставки)
    }

}