<template>
    <div class="batch-management">
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-input v-model="select_title" placeholder="请输入文章标题" class="handle-input mr10"></el-input>
            <el-input v-model="select_time" placeholder="请输入时间" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table
            :data="data"
            border
            class="table"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
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
            :formatter="formatter"
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
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="时长">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.timespan" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <img :src="form.image"  min-width="70" height="70" />
                    <!-- <el-input v-model="form.image"></el-input> -->
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'batchmanagement',
    data() {
      return {
        tableData: [],       
        cur_page: 1,
        pageCount:0,
        multipleSelection: [],//选中显示的值
        select_word: '',
        select_title: '',
        select_time: '',
        is_search: false,
        del_list: [],
        editVisible: false,//编辑弹窗
        delVisible: false,//删除弹窗
        form: {
            title: '',
            timespan: '',
            image: ''
        },
        idx: -1
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
                //批量删除
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.title === this.del_list[i].title) {
                        is_del = true;
                        break;
                    }
                }
                // 单个属性查询及模糊查询
                if(!is_del){
                    if(d.title.indexOf(this.select_title) > -1 && d.timespan.indexOf(this.select_time) > -1 && (d.title.indexOf(this.select_word) > -1 || d.timespan.indexOf(this.select_word) > -1)){
                        return d;
                    }
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
            this.$axios.get('/inter/getClasses.php',{params:{curPage:this.cur_page}})
                .then(function(response){
                    var _data=response.data
                    console.log(_data)
                    _this.pageCount=_data.totalCount;
                    _this.tableData=_data.data;
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        search() {
            this.is_search = true;
        },
        formatter(row, column) {//tabel-column 属性：用来格式化内容
            return '2018-02-27';
        },
        handleSelectionChange(val) {//获取选中项
            this.multipleSelection = val;
        },
        delAll() {//批量删除
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].title + ' ';
            }
            if(str==''){
                this.$message.error('请选择要删除的选项');
            }else{
                this.$message.error('删除了' + str);
            }
            this.multipleSelection = [];
        },
        // delAllTrue(multipleSelection) {//真实的走接口的批量删除
        //     var ids = [];
        //     multipleSelection.forEach(element => {
        //         ids.push(element.id)
        //     });
        //     this.$message.error('确定要删除选中的文件吗?').then(()=>{
        //         this.$axios.post('/ms/delAll',{ids:ids})
        //         .then(function(response){
        //             var _data=response.data
        //             _this.pageCount=_data.totalCount;
        //             _this.tableData=_data.data;
        //         })
        //         .catch(function(error){
        //             console.log(error)
        //         })
        //     })
            
        //     this.multipleSelection = [];
        // },
        handleDelete(index, row) {//列删除
            this.idx = index;
            this.delVisible = true;
        },
        // 确定删除
        deleteRow(){
            this.tableData.splice(this.idx, 1);
            this.$message.success('删除成功');
            this.delVisible = false;
        },
        // 编辑
        handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            // item.timespan=moment(item.timespan).format('YYYY-MM-DD');
            this.form = {
                title: item.title,
                timespan: item.timespan,
                image: item.image
            }
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            //Vue.set是全局api
            // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
            // 它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 
            this.$set(this.tableData, this.idx, this.form);
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx+1} 行成功`);
            // 模拟真实接口
            // this.$axios.post('/ms/saveEdit',{
            //     title: this.form.title,
            //     timespan: this.form.timespan,
            //     image: this.form.image
            // })
            // .then(function(response){
            //     this.editVisible = false;
            //     this.$message.success(`修改第 ${this.idx+1} 行成功`);
            // })
            // .catch(function(error){
            //     console.log(error)
            // })
        }
    }
}
</script>
<style scoped>
    .handle-box {
        margin-bottom: 10px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .red{
        color: #ff0000;
    }
</style>

