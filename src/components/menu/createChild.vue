<template>
    <el-dialog :title="title" :visible.sync="$store.state.menu.childMenuCreateStatus" width="40%"
               :before-close="cancel">
        <el-form ref="form" label-position="top">
            <el-form-item label="菜单名称">
                <el-input v-model="menuChildData.name" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单链接">
                <el-input v-model="menuChildData.url" placeholder="菜单链接"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标">
                <el-input v-model="menuChildData.icon" placeholder="菜单图标"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序">
                <el-input v-model="menuChildData.sort" placeholder="菜单排序"></el-input>
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
        name: 'createMain',
        data() {
            return {
                title: '添加子菜单',
                menuChildData: {
                    name: '',
                    url: '',
                    icon: '',
                    sort: 0,
                    parent_id: 0
                },
                menus: '',
            }
        },
        methods: {
            cancel() {
                this.$store.state.menu.childMenuCreateStatus = false
            },
            submit() {
                this.menuChildData.parent_id = this.$store.state.menu.parent_id;
                this.$store.dispatch('storeMenu', this.menuChildData);
            }
        }
    }
</script>