<template>
    <el-dialog :title="title" :visible.sync="visibleStatus" width="40%" :before-close="handleClose">
        <el-form ref="form" label-position="top">
            <el-form-item label="菜单名称">
                <el-input v-model="menuData.name" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="父级菜单">
                <el-select v-model="menuData.parent_id" placeholder="请选择父级菜单" style="width: 100%">
                    <el-option
                            v-for="(menu, index) in menus"
                            :label="menu.name"
                            :value="menu.id"
                            :key="index"

                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单链接">
                <el-input v-model="menuData.url" placeholder="菜单链接"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: 'create',
        props: ["visibleStatus"],
        data() {
            return {
                title: '添加菜单',
                menuData: {
                    name: '',
                    parent_id: '',
                    url: '',
                },
                status: this.visibleStatus,
                menus: '',
            }
        },
        watch: {
            visibleStatus(val) {
                this.status = val;//②监听外部对props属性visibleStatus的变更，并同步到组件内的data属性status中
            },
            status(val) {
                this.$emit('copyVisibleStatus', val)
                this.menuData = {
                    name: '',
                    parent_id: '',
                    url: '',
                }
                this.getParentMenus();
            }
        },
        methods: {
            cancel() {
                this.$emit('copyVisibleStatus', !this.status);
            },
            submit() {
                this.$emit('onSubmit', this.menuData);
            },
            handleClose(done) {
                this.$emit('copyVisibleStatus', !this.status);
            },
            getParentMenus() {
                this.$http.get("/menu/parent").then((response) => {
                    this.menus = response.data.data;
                });
            }
        }
    }
</script>