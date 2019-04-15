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
                },
                {
                    path: '/workquery',
                    component: resolve => require(['../components/page/WorkQuery.vue'], resolve),
                    meta: { title: '工单查询' }
                },
                {
                    path: '/dataaddition',
                    component: resolve => require(['../components/page/DataAddition.vue'], resolve),
                    meta: { title: '数据添加' }
                },
                {
                    path: '/blacklist',
                    component: resolve => require(['../components/page/BlackList.vue'], resolve),
                    meta: { title: '黑名单管理' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
})
