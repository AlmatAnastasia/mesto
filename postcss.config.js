const autoprefixer = require('autoprefixer'); // префиксы
const cssnano = require('cssnano'); // минификация

module.exports = {
    plugins: [ // настройка минификации CSS и автоматического добавления вендорных префиксов
        autoprefixer,
        cssnano({ preset: 'default' })
    ]
};  