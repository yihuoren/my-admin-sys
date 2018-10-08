<template>
    <div class="batch-management">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="title"
            label="文章标题"
            width="auto"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="timespan"
            label="课程时长"
            width="auto"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="image"
            label="图片"
            align="center"
            >
                <template slot-scope="scope">            
                    <img :src="scope.row.image"  min-width="70" height="70" />
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background 
                @current-change="handleCurrentChange"
                :page-count="pageCount"
                layout="prev, pager, next" 
                >
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        cur_page: 1,
        pageCount:0,
        tableData: []
      }
    },
    mounted:function(){
        this.getData();
    },
    methods:{
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData(){
            let _this=this;
            console.log(this.nameSearch)
            this.$axios.get('/ms/inter/getClasses.php',{params:{curPage:this.cur_page}})
                .then(function(response){
                    var _data=response.data
                    console.log(_data)
                    _this.pageCount=_data.totalCount;
                    _this.tableData=_data.data;
                })
        }
    }
}
</script>
