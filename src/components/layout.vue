<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">处理中心</el-menu-item>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']" :unique-opened="true" :collapse-transition="true" router >
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
                        <el-menu-item-group>
                            <template slot="title"><hr/></template>
                            <el-menu-item index="1-1" route="menu">菜单管理</el-menu-item>
                            <el-menu-item index="1-2" route="system-setting">系统设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>权限管理</template>
                        <el-menu-item-group>
                            <template slot="title"><hr/></template>
                            <el-menu-item index="2-1">角色管理</el-menu-item>
                            <el-menu-item index="2-2">权限管理</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-3">
                            <template slot="title">用户管理</template>
                            <el-menu-item index="2-3-1">管理员管理</el-menu-item>
                            <el-menu-item index="2-3-2">用户管理</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>文章管理</template>
                        <el-menu-item-group>
                            <template slot="title"><hr/></template>
                            <el-menu-item index="3-1">文章列表</el-menu-item>
                            <el-menu-item index="3-2">回收站</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>文章管理</template>
                        <el-menu-item-group>
                            <template slot="title"><hr/></template>
                            <el-menu-item index="3-1">文章列表</el-menu-item>
                            <el-menu-item index="3-2">回收站</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: 'layout',
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-header {
        padding: 0 0;
    }
    .el-header .el-menu-item  {
        border-bottom: 2px solid #409EFF;
        float: right;
        color: #303133;
    }
    .el-header .el-menu  {
        padding-right: 50px;
    }
    .el-breadcrumb{
        height: 50px;
        line-height: 50px;
        padding-bottom: 20px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .search_div {
        height: 50px;
        width: 100%;
        font-size: 12px;
        padding-bottom: 10px;
    }
</style>
