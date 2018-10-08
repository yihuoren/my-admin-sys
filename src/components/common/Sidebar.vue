<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-icall-gongdanguanli',
                        index: 'dashboard',
                        title: '工单管理',
                        subs: [
                            {
                                index:'batchmanagement',
                                title:'工单批次管理'
                            },
                            {
                                index:'marketwork',
                                title:'新建工单'
                            },
                            {
                                index:'workquery',
                                title:'工单查询'
                            },
                            {
                                index:'dataaddition',
                                title:'数据添加'
                            },
                            {
                                index:'blacklist',
                                title:'黑名单管理'
                            },
                            {
                                index:'workallot',
                                title:'工单分配配置'
                            },
                            {
                                index:'reconsider',
                                title:'复议工单'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-icall-ziyuanguanli',
                        index: 'table',
                        title: '资源管理',
                        subs: [
                            {
                                index:'numbermanagement',
                                title:'号码管理'
                            },
                            {
                                index:'terminalmanagement',
                                title:'终端管理'
                            },
                            {
                                index:'uimcard',
                                title:'UIM卡管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-icall-baobiaoguanli',
                        index: 'excel',
                        title: '报表管理'
                    },
                    {
                        icon: 'el-icon-icall-8636f874',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
