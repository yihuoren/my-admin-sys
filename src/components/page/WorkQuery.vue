<template>
    <div>
        <el-table
        :data="tableData1"
        class="table"
        style="width: 100%">
        <el-table-column
            prop="spantime"
            label="日期"
            width="auto"
            align="center">
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="auto"
            align="center">
        </el-table-column>
        <el-table-column
            prop="content"
            label="描述"
            align="center">
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:"workquery",
    data(){
        return {
            tableData1: []
        }
    },
    created() {
        this.getData();
    },
    methods:{
        getData(){
            let _this=this;
            this.$axios.get('http://localhost:8080/login/getList')
            .then(function(response){
                var _data=response.data;
                _this.tableData1=_data;
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>

