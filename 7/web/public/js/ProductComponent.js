Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/263x280'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="row row-cols-1 row-cols-md-3">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.image"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="col mb-4">
                    <div class="card border-0 h-100">
                        <img :src="img" class="card-img-top" alt="Mango People T-shirt">
                        <div class="card-body">
                            <h5 class="card-title">{{product.product_name}}</h5>
                            <p class="card-text card__price">$ {{product.price}}</p>
                            <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                        </div>
                    </div>
                </div>`
})