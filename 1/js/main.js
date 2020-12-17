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
    return `<div class="product-item col mb-5 d-flex justify-content-center">
                <div class="card border-0 h-100">
                <!--
                    <img src="images/index/cards/1.jpg" class="card-img-top" alt="Mango People T-shirt">
                -->
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text card__price">${product.price}</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>
            </div>`;
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