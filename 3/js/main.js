const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Param {
    constructor(element) {
        this.product_name = element.dataset['title'];
        this.id_product = +element.dataset['id'];
        this.price = +element.dataset['price'];
        this.quantity = 1;
    }
}

class Cart {
    /**
     * constructor
     * @param container
     */
    constructor(container = '.cartTableBody') {
        this.container = container;
        this.amount = 0;
        this.countGoods = 0;
        this.cartItems = [];
        this._fetchCartItems();
    }

    /**
     *
     * @private
     */
    _fetchCartItems() {
        this._getCartItems()
            .then(data => {
                this.cartItems = [...data.contents];
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.render()
            });
    }

    /**
     * Функция запрашивает данные корзины с сервера
     * @returns {Promise<any | void>}
     * @private
     */
    _getCartItems() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * Add the items to the cart
     * @param item
     */
    addItem(item) {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].id_product === item.id_product) {
                this.cartItems[i].quantity += 1;
            } else {
                //@todo draw new <tr>
            }
        }
        this.render();
    }

    /**
     * Delete an item
     * @param item
     */
    deleteItem(item) {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].id_product === item.id_product) {
                if (this.cartItems[i].quantity > 1) {
                    this.cartItems[i].quantity -= 1;
                } else {
                    //@todo remove <tr>
                    //delbtn->parent <tr>
                }
            }
        }
        this.render();
    }

    /**
     * render all cart items
     */
    render() {
        const block = document.querySelector(this.container);
        let itemsHtml = '';
        this.amount = 0;
        this.countGoods = 0;
        for (let cartItem of this.cartItems) {
            const curtObject = new CartItem(cartItem);
            itemsHtml += curtObject.render();
            this.amount += curtObject.price * curtObject.quantity;
            this.countGoods += curtObject.quantity;
        }
        let totalRow = `<tr>
                            <td></td>
                            <td><strong>GRAND TOTAL:</strong></td>
                            <td><strong>${this.countGoods}</strong></td>
                            <td><strong>${this.amount}</strong></td>
                            <td></td>
                        </tr>`;
        ;
        block.innerHTML = itemsHtml + totalRow;
        // кнопки "удалить"
        let deleteBtns = document.querySelectorAll('i.fa-times-circle');
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', (event) => this.handleDeleteClick(event));
        }
    }

    handleDeleteClick(event) {
        let data = event.currentTarget;
        let deleteItem = new Param(data);
        this.deleteItem(deleteItem);
    }

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
    constructor(item, img = 'http://via.placeholder.com/40x40.jpg') {
        this.title = item.product_name;
        this.price = item.price;
        this.id = item.id_product;
        this.quantity = item.quantity;
        this.img = img;
    }

    /**
     * render cart item
     */
    render() {
        let subtotal = this.quantity * this.price;
        return `<tr>
                    <td>${this.title}</td>
                    <td>${this.price}</td>
                    <td>${this.quantity}</td>
                    <td>${subtotal}</td>
                    <td>
                        <i class="fas fa-times-circle"
                            data-price="${this.price}" 
                            data-id="${this.id}" 
                            data-title="${this.title}"></i>
                    </td>
                </tr>`;
    }
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
        this._fetchProducts();
        this.cart = new Cart();
    }

    _fetchProducts() {
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
        // кнопки "купить"
        let buyBtns = document.querySelectorAll('button[class="buy-btn"]');
        for (let i = 0; i < buyBtns.length; i++) {
            buyBtns[i].addEventListener('click', (event) => this.handleBuyBtnClick(event));
        }

    }

    handleBuyBtnClick(event) {
        let dataDiv = event.currentTarget.closest('div.product-item');
        let buyCartItem = new Param(dataDiv);
        this.cart.addItem(buyCartItem);
    }
}

class ProductItem {
    constructor(product, img = 'http://via.placeholder.com/260x280.jpg') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item col mb-5 d-flex justify-content-center" 
                    data-price="${this.price}" data-id="${this.id}" data-title="${this.title}">
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

