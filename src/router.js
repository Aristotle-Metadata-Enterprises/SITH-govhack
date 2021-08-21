import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'mainPage',
            component: HomePage
        },
    ],
    scrollBehavior: function() {
        // Scroll to top when changing routes
        return {x: 0, y: 0}
    }
})

export default router
