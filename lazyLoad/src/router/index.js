import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'

Vue.use(Router)

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/${view}.vue`)
}

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: loadView('Home')
        },
        {
            path: '/about',
            name: 'about',
            component: loadView('About')
        }
    ]
})