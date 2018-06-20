<template>
    <div class="container">
        <el-row>
            <el-col :span="8" :offset="8" class="log_div">
                <img src="../../assets/logo.svg">
            </el-col>
            <el-col :span="8" :offset="8">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
                         class="demo-ruleForm" label-position="left">
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="loginForm.account" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-col :span="14">
                            <el-input type="text" v-model="loginForm.code" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-input type="text" v-model="loginForm.code" auto-complete="off"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item style="padding-top: 5%;">
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                        <!--<el-button @click="resetForm('rules')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            var validateAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    account: 'zhimma',
                    password: '123456',
                    code: '123456'
                },
                rules: {
                    account: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCode, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/auth/login')
                            .then((response) => {
                                console.log(response)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    .container {
        min-width: 960px;
    }

    .log_div {
        padding: 5% 0 5% 0;
    }
</style>