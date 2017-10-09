import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../pages/index.vue'




Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes:[{
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            path: '/index',
            name: 'index',
            component:index
        }
    ]
})

export {router}