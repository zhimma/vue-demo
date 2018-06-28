<template>
    <el-dialog :title="title" :visible.sync="$store.state.menu.mainMenuCreateStatus" width="40%" :before-close="cancel">
        <el-form ref="form" label-position="top">
            <el-form-item label="菜单名称">
                <el-input v-model="menuMainData.name" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标">
                <el-input v-model="menuMainData.icon" placeholder="菜单图标"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序">
                <el-input v-model="menuMainData.sort" placeholder="菜单排序"></el-input>
            </el-form-item>
            <!--<el-form-item label="父级菜单">
                <el-select v-model="menuData.parent_id" placeholder="请选择父级菜单" style="width: 100%">
                    <el-option
                            v-for="(menu, index) in menus"
                            :label="menu.name"
                            :value="menu.id"
                            :key="index"

                    >
                    </el-option>
                </el-select>
            </el-form-item>-->
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
                title: '添加主菜单',
                menuMainData: {
                    name: '',
                    icon: '',
                    sort: 0,
                    parent_id: this.$store.state.menu.parent_id
                },
                menus: '',
            }
        },
        methods: {
            cancel() {
                this.$store.state.menu.mainMenuCreateStatus = false
                this.menuMainData = {
                    name: '',
                    icon: '',
                    sort: 0,
                    parent_id: this.$store.state.menu.parent_id
                }
            },
            submit() {
                this.menuMainData.parent_id = this.$store.state.menu.parent_id;
                this.$store.dispatch('storeMenu', this.menuMainData);
                var self = this;
                setTimeout(function (self) {
                    self.menuMainData = {
                        name: '',
                        icon: '',
                        sort: 0,
                        parent_id: self.$store.state.menu.parent_id
                    }
                }, 500, self);

            }
        }
    }
</script>