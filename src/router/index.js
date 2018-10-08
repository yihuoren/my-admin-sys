import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/batchmanagement',
                    component: resolve => require(['../components/page/BatchManagement.vue'], resolve),
                    meta: { title: '工单批次管理' }
                },
                {
                    path: '/marketwork',
                    component: resolve => require(['../components/page/MarketWork.vue'], resolve),
                    meta: { title: '新建工单' }
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
