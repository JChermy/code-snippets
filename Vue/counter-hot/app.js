import Vue from 'vue'
import store from './store'
import CountControls from './CountControls.vue'

new Vue({
    el: '#app',
    store,
    render: h=>h(CountControls)
})