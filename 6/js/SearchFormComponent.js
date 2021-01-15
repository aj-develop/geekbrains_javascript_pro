Vue.component('search-form', {
    props: ['userSearch'],
    template: `<form action="#" class="search-form" v-on:submit.prevent="$emit('submitprevent')">
                    <input 
                        type="text" 
                        class="search-field"
                        v-bind:userSearch="userSearch"
                        v-on:input="$emit('input', $event.target.value)"> 
                    <button type="submit" class="btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
});