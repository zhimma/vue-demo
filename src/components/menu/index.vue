<template>
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>

        </el-col>

        <el-col class="p-b-50">
            <el-form :inline="true" :model="formInline" class="searchForm" size="medium">
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="20" class="p-b-50">
            <el-button type="default" @click="createMenu" style="float: right">添加菜单</el-button>
        </el-col>
        <create-menu :visibleStatus="visibleStatus" @copyVisibleStatus="copyVisibleStatus" @onSubmit="onSubmit" ></create-menu>
        <el-col :span="20">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>
<script>
    import createMenu from './create.vue'

    export default {
        name: 'menuPage',
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                formInline: {
                    user: '',
                    region: ''
                },
                visibleStatus:false,
            }
        },
        components: {
            createMenu,
        },
        methods: {
            onSearch() {
                console.log('search');
            },
            onSubmit(data) {
                this.visibleStatus = !this.visibleStatus;
                console.log(data);
            },
            copyVisibleStatus(status){
                this.visibleStatus= status;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
            },
            getMenus() {
                this.$http.get('/me').then((response => {
                    console.log(response);
                }))
            },
            createMenu() {
                this.visibleStatus = true;
            },
        },
        created() {
            this.getMenus();
        }
    }
</script>
<style>

</style>