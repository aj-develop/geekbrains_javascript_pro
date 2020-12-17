"use strict";

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара

// 2. Добавьте значения по умолчанию для аргументов функции.
// Ответ: Например так:  renderProduct = (title='значение по умолчанию', price='значение по умолчанию')
// Как можно упростить или сократить запись функций?
// Ответ: Передаём и принимаем объект

const renderProduct = (product) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

// 3. *Сейчас после каждого товара на странице выводится запятая.
// Из-за чего это происходит?
// Ответ: Потому что map возвращает массив, который для перевода в строку пропускается через toString,
// который разделяет элементы массива запятыми.
// Как это исправить?
// Ответ: Исправляем с помошью "join('')"
// join - метод массива, который возвращает строку, в которой строковые представления элементы массива разделены строкой,
// которая передана в join как параметр

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join('');
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);