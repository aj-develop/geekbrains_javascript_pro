Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form class="header__form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <div class="browse">
                    Browse <i class="fas fa-caret-down"></i>
                </div>
                <input type="text" v-model="userSearch">
                <button type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
})