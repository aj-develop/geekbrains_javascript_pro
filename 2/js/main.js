/*
    1. Добавьте пустые классы для корзины товаров и элемента корзины товаров.
    Продумайте, какие методы понадобятся для работы с этими сущностями.
 */

class Cart {
    constructor() {
        this.goods = [ // all cart items
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    /**
     * Add the items to the cart
     * @param {CartItem} item
     */
    addItem(item) {
    }

    /**
     * Update some quantities
     * @param {CartItem} item
     * @param {int} quantity
     */
    updateItem(item, quantity) {

    }

    /**
     * Delete an item
     * @param {CartItem} item
     */
    deleteItem(item) {

    }

    /**
     * render all cart items
     */
    render() {

    }

    /*
         2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
     */

    /**
     * calculate total price of all cart items
     * @returns {int} total price
     */
    getTotalPrice() {
        let total = 0;
        this.goods.forEach(function (item) {
            total += item.price;
        });

        return total;
    }
}

class CartItem {
    /**
     * render cart item
     */
    render() {

    }
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
//        this.allProducts=[];//массив объектов
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
//            this.allProducts.push(productObject);
//            block.innerHTML += productObject.render();
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/260x280') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item col mb-5 d-flex justify-content-center">
                <div class="card border-0 h-100">
                    <img src="${this.img}" class="card-img-top" alt="alt">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text card__price">${this.price}</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>
            </div>`;
    }
}

let list = new ProductsList();
list.render();

let cart = new Cart();
console.log(cart.getTotalPrice());

