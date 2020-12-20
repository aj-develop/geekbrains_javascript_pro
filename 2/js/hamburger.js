/*
    3. Некая сеть фастфуда предлагает несколько видов гамбургеров:
        a. Маленький (50 рублей, 20 калорий).
        b. Большой (100 рублей, 40 калорий).
    Гамбургер может быть с одним из нескольких видов начинок (обязательно):
        a. С сыром (+10 рублей, +20 калорий).
        b. С салатом (+20 рублей, +5 калорий).
        c. С картофелем (+15 рублей, +10 калорий).
    Дополнительно гамбургер можно:
    посыпать приправой (+15 рублей, +0 калорий)
    и полить майонезом (+20 рублей, +5 калорий).

    Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
 */
"use strict";

class Hamburger {

    constructor() {
        this.totalPrice = 0;
        this.totalCalories = 0;
        this.sizes = [];
        this._fetchSizes();
        this.toppings = [];
        this._fetchToppings();
    }

    _fetchSizes() {
        this.sizes = [
            {id: 1, title: 'Маленький', price: 50, calories: 20},
            {id: 2, title: 'Большой', price: 100, calories: 40}
        ];
    }

    _fetchToppings() {
        this.toppings = [
            {id: 1, title: 'Сыр', price: 10, calories: 20},
            {id: 2, title: 'Салат', price: 20, calories: 5},
            {id: 3, title: 'Картофель', price: 15, calories: 10},
            {id: 4, title: 'Приправа', price: 15, calories: 0},
            {id: 5, title: 'Майонез', price: 20, calories: 5}
        ];
    }

    initialize() {
        this.renderSizeSelectField();
        this.renderToppingsSelectField();
        // button
        let buttonCalculate = document.querySelector('button');
        buttonCalculate.addEventListener('click', () => this.handleClick());
    }

    /**
     * Функция выводит select с размерами
     */
    renderSizeSelectField() {
        let selectSize = document.querySelector('select[id="size"]');
        this.sizes.forEach(function (item) {
            let selectOption = document.createElement("option");
            selectOption.text = item.title;
            selectOption.value = item.id;
            selectSize.add(selectOption);
        });
    }

    /**
     * Функция выводит select с начинками, приправками и майонезом
     */
    renderToppingsSelectField() {
        let selectToppings = document.querySelector('select[id="toppings"]');
        selectToppings.size = this.toppings.length;
        this.toppings.forEach(function (topping) {
            let selectOption = document.createElement("option");
            selectOption.text = topping.title;
            selectOption.value = topping.id;
            selectToppings.add(selectOption);
        });
    }

    /**
     * Функция обрабатывает клик по кнопке "Сделать заказ"
     * а так же выводит общие сумму заказа и калории
     */
    handleClick() {
        this.totalPrice = 0;
        this.totalCalories = 0;
        let sizeValue = parseInt(document.querySelector('select[id="size"]').value);
        let toppingsSelectedOptions = document.querySelector('select[id="toppings"]').selectedOptions;
        let toppingsValues = Array.from(toppingsSelectedOptions).map(el => parseInt(el.value));

        this.sizes.forEach((item) => this.calculatePriceBySize(item, sizeValue));
        this.toppings.forEach((item) => this.calculatePriceToppings(item, toppingsValues));

        this.renderTotals();
    }

    /**
     * Функция выводит общие сумму заказа и калории
     */
    renderTotals() {
        let spanPrice = document.querySelector('span[class="price"]');
        let spanCalories = document.querySelector('span[class="calories"]');
        spanPrice.innerHTML = this.totalPrice;
        spanCalories.innerHTML = this.totalCalories;
        let divTotal = document.querySelector('div.total');
        divTotal.style.display = 'block';
    }

    /**
     * Функция вычисляет цену и калории по размеру гамбургера
     * @param item
     * @param {int} sizeValue
     */
    calculatePriceBySize(item, sizeValue) {
        if (item.id === sizeValue) {
            this.totalPrice += item.price;
            this.totalCalories += item.calories;
        }
    }

    /**
     * Функция вычисляет цену и калории всех начинок, приправки и майонеза
     * @param item
     * @param {array} toppingsValues
     */
    calculatePriceToppings(item, toppingsValues) {
        if (toppingsValues.includes(item.id)) {
            this.totalPrice += item.price;
            this.totalCalories += item.calories;
        }
    }
}

let hamburger = new Hamburger();
hamburger.initialize();