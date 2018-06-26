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
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>

        </el-col>
        <el-col :span="20" class="p-b-50">
            <el-button type="info" @click="refreshMenu()" style="float: right;margin-left:  20px">刷新</el-button>
            <el-button type="primary" @click="createMenu(0)" style="float: right">添加主菜单</el-button>
        </el-col>
        <!--<create-main-menu v-if="$store.state.menusCreateStatus"></create-main-menu>-->
        <create-main-menu></create-main-menu>
        <create-child-menu></create-child-menu>
        <el-col :span="20">
            <el-collapse v-for="(menu, index) in menusData" :key="index">
                <el-collapse-item :title="menu.name" name="1">
                    <el-button type="danger" size="small" @click="handleDelete(menu.id)"
                               style="float: right;margin: 0 20px 20px 0">删除
                    </el-button>
                    <el-button type="primary" size="small" @click="createMenu(menu.id)"
                               style="float: right;margin:  0 20px 20px 0">添加子菜单
                    </el-button>
                    <el-table
                            v-if="menu._child"
                            :data="menu._child"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="菜单名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="菜单链接"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="icon"
                                label="菜单图标">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        prop="id"
                                        size="mini"
                                        @click="handleEdit(scope.row.id, false)">编辑
                                </el-button>
                                <el-button
                                        prop="id"
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row.id, false)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-row>
</template>
<script>
    import createMainMenu from './createMain.vue'
    import createChildMenu from './createChild.vue'

    export default {
        name: 'menuPage',
        data() {
            return {
                menusData: {},
                childMenuData: [],
                childMenuDatas: [{
                    "id": 2,
                    "parent_id": 1,
                    "name": "菜单管理",
                    "url": "/menu",
                    "icon": "fa",
                    "status": 1,
                    "created_at": null,
                    "updated_at": null
                }],
                formInline: {
                    user: '',
                    region: ''
                },
                title: '',
                menuParentId: 0,
            }
        },
        components: {
            createMainMenu,createChildMenu
        },
        methods: {
            createMenu(parent_id) {
                if (parent_id) {
                    this.$store.dispatch('showCreateChildMenu', parent_id);
                } else {
                    this.$store.dispatch('showCreateMainMenu', 0);
                }
            },
            refreshMenu() {
                window.location.reload();
            },
            onSubmit(data) {
                this.$http.post("/menu", data).then((response) => {
                    if (response.data.code == 200) {
                        this.visibleStatus = !this.visibleStatus;
                        this.$notify({
                            title: '菜单添加结果',
                            message: '菜单添加成功',
                            type: 'success'
                        });
                    }
                })
            },
            copyVisibleStatus(status) {
                this.visibleStatus = status;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
            },
            copyVisibleChildStatus(status) {
                this.visibleChildStatus = status;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
            },
            getMenus() {
                this.$http.get('/menu').then((response => {
                    this.menusData = response.data.data
                }))
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, type = true) {
                console.log(index, type);
            },
            handleCreate(index, type = true) {
                console.log(index, type);
            }
        },
        mounted() {
            this.getMenus();
        }
    }
</script>
<style>

</style>