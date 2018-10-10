<template>
    <div class="batch-management">
        <div class="handle-box">
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-input v-model="select_title" placeholder="请输入文章标题" class="handle-input mr10"></el-input>
            <el-input v-model="select_time" placeholder="请输入时间" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table
            :data="data"
            border
            class="table"
            @selection-change="handleSelectionChange"
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
        tableData: [],
        cur_page: 1,
        pageCount:0,
        multipleSelection: [],
        select_word: '',
        select_title: '',
        select_time: '',
        is_search: false
      }
    },
    created() {
        this.getData();
    },
    // mounted:function(){
    //     this.getData();
    // },
    computed: { //计算属性，通过查询返回更新tableData
        data() {
            return this.tableData.filter((d)=>{
                // 单个属性查询及模糊查询
                if(d.title.indexOf(this.select_title) > -1 && d.timespan.indexOf(this.select_time) > -1 && (d.title.indexOf(this.select_word) > -1 || d.timespan.indexOf(this.select_word) > -1)){
                    return d;
                }
            })
        }
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
        },
        search() {
            this.is_search = true;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>

