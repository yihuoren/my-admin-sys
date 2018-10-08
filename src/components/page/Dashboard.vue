<template>
    <div>
        系统首页
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username')
            }
        }
    }

</script>


<style scoped>
</style>
