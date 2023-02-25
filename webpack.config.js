const path = require('path'); // подключение плагинов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' }, // точка входа
    output: { // точка выхода
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development', // режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [ // правила (массив правил) обработки файлов при сборке
            { // минификация и транспиляция js babel
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            { // настройка обработки изображений и шрифтов
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            { // настройка минификации CSS и автоматического добавления вендорных префиксов
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader', // настройка обработки CSS
                }, 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }), // работа с html-файлами
        new CleanWebpackPlugin(), // удалить содержимое dist 
        new MiniCssExtractPlugin() // объединить css файлы
    ]
};