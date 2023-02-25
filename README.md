# Проект: Mesto
---
***Содержание файла README.md***
<p>
<a href="#description">Описание</a>
<br>
<a href="#figma">Ссылка на макет в Figma</a>
<br>
<a href="#demo">Демонстрация</a>
<br>
<a href="#file_structure">Файловая структура</a>
<br>
<a href="#technologies">Использованные технологии</a>
<br>
<a href="#functionality">Функциональность</a>
</p>

<div id="description"></div>
<h2>Описание</h2>
<p>Данный проект реализован в рамках курсов от Яндекс.Практикум и представляет собой сервис Mesto: интерактивную страницу, куда можно добавлять фотографии, удалять их и ставить лайки. Для реализации используются дизайн-макеты в Figma.</p>

<div id="figma"></div>
<h2>Ссылка на макет в Figma</h2> 
<p><a href="https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1">Макет 1</a> - в нем видно видно, как проект должен выглядеть на разрешениях экранов 320 и 1280 пикселей.</p>
<p><a href="https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1">Макет 2</a> - новая функциональность, попапы.</p>
<p><a href="https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1">Макет 3</a> - новая функциональность, валидация.</p>

<div id="demo"></div>
<h2>Демонстрация</h2>
<h3>Ссылка на сайт <a href="https://almatanastasia.github.io/mesto/">тут</a> !</h3>
<p>❆ Pазрешение - 1280 пикселей</p>
<img src="./src/images/Demo_index_1280.png" alt="Демо страницы index.html 1280px" width="900">
<p>❆ Pазрешение - 320 пикселей</p>
<img src="./src/images/Demo_index_320.png" alt="Демо страницы index.html 320px" width="900">

<div id="file_structure"></div>
<h2>Файловая структура</h2>
<pre>
.
├── blocks          # Файлы стилей блоков<br>
├── fonts           # Файлы шрифтов<br>
├── images          # Файлы изображений<br>
├── pages           # Файлы стилей страниц<br>
├── scripts         # Файлы скриптов страниц<br>
├── vendor          # Файлы сторонних библиотек<br>
├── .nojekyll       # Пустой файл для публикации на GitHub Pages<br>
├── README.md       # Файл документации проекта<br>
└── index.html      # Главная страница сервиса
</pre>

<div id="technologies"></div>
<h2>Использованные технологии</h2>
<p>
⬥ Работа с макетом в Figma<br>
⬥ Расширенные возможности HTML и CSS <br>
⬥ Технологии адаптивной верстки<br>
⬥ Файловая структура CSS по методолгии БЭМ (Nested)<br>
⬥ Базовый JavaScript (функции, массивы, объекты)<br>
⬥ Работа с DOM (методы addEventListener, querySelector)<br>
⬥ Изменение документа (создание, добавление и удаление элементов в DOM)<br>
⬥ Обработка событий<br>
⬥ Работа с формами, валидация форм<br>
⬥ Объектно-ориентированное программирование<br>
⬥ Рзбиение на модули<br>
⬥ Деструктуризация, слабая связь между классами<br>
⬥ Явная привязка контента методом bind
</p>

<div id="functionality"></div>
<h2>Функциональность</h2>
<p>✶ Шесть карточек</p>
<p>✶ Три формы</p>
<p>Форма редактирования профиля</p>
<img src="./src/images/Demo_form_edit.png" alt="Демо форма &quot;Редактировать профиль&quot;" width="900">
<p>Форма добавления новой карточки</p>
<img src="./src/images/Demo_form_new-card.png" alt="Демо форма &quot;Новое место&quot;" width="900">
<p>Форма просмотра фотографий</p>
<img src="./src/images/Demo_form_image.png" alt="Демо форма &quot;Фотография&quot;" width="900">
<p>✶ Добавление карточки</p>
<img src="./src/images/Demo_addCard_before.png" alt="Добавление карточки &quot;До&quot;" width="900"><br>
<img src="./src/images/Demo_addCard_after.png" alt="Добавление карточки &quot;После&quot;" width="900">
<p>✶ Удаление карточки</p>
<img src="./src/images/Demo_deleteCard_before.png" alt="Удаление карточки &quot;До&quot;" width="900"><br>
<img src="./src/images/Demo_deleteCard_after.png" alt="Удаление карточки &quot;После&quot;" width="900">
<p>✶ Лайк карточки</p>
<img src="./src/images/Demo_addLike_before.png" alt="Лайк карточки &quot;До&quot;" width="900"><br>
<img src="./src/images/Demo_addLike_after.png" alt="Лайк карточки &quot;После&quot;" width="900">
<p>✶ Плавное открытие и закрытие попапов</p>
<p>✶ Лайв-валидация («Живая» валидация)</p>
</p>Валидация формы «Редактировать профиль»</p>
<img src="./src/images/Demo_editValidation_before.png" alt="Валидация формы &quot;Редактировать профиль&quot;" width="900"><br>
<img src="./src/images/Demo_editValidation_after.png" alt="Валидация формы &quot;Редактировать профиль&quot;" width="900">
</p>Валидация формы «Новое место»</p>
<img src="./src/images/Demo_newCardValidation_before.png" alt="Валидация формы &quot;Новое место&quot;" width="900"><br>
<img src="./src/images/Demo_newCardValidation_after.png" alt="Валидация формы &quot;Новое место&quot;" width="900">
<p>Три состояния кнопки отправки формы: обычное, при наведении и disabled</p>
<p>Попап закрывается по в клику любом месте вне этого окна и по нажатию на Esc</p>
<p>Закрытие попапа кликом на оверлей</p>
<p>Закрытие попапа нажатием на Esc</p>

**Картинки**

Доставать картинки Фигмы - расхожая практика, поэтому полезно потренироваться.
Нужно [оптимизировать картинки](https://tinypng.com/), чтобы сайт загружался быстрее.