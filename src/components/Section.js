export default class Section { // класс Section, который отвечает за отрисовку элементов на странице

    // конструктор принимает два параметра: объект с двумя свойствами и селектор контейнера 
    constructor({ items, renderer }, sectionCardsSelector) {
        // приватные поля (переменные с this) экземпляра класса Section
        this._items = items; // массив данных
        this._renderer = renderer; // функция (создание и отрисовка данных на странице)
        this._sectionCards = document.querySelector(sectionCardsSelector); // селектор контейнера
    }

    // публичные методы
    renderItems() { // отрисовать все элементы
        this._items.reverse().forEach((item) => { // создать шесть карточек
            this._renderer(item); // создать карточку
        });
    }

    addItem(elem) { // добавить элемент в контейнер
        this._sectionCards.prepend(elem); // вставить в начало элемента (метод вставки)
    }

}