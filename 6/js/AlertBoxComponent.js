Vue.component('alert-box', {
    props: ['visibility', 'message'],
    template: `<div class="alert-box" v-show="visibility">
                    <strong>Ошибка!</strong><br>
                    <slot>{{ message }}</slot>
                </div>`
});