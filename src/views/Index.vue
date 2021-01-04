<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-form">
            <h2 class="login-title">博客管理系统</h2>
            <el-form-item label="" prop="username"  class="margin margin1" >
                <el-input  v-model="ruleForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password" class="margin margin1">
                <el-input v-model="ruleForm.password" type="password"  placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login-table margin">
                <el-button class="login-span" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from '../api/login';
    export default {
        name: "Index",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login(this.ruleForm.username,this.ruleForm.password).then(res=>{
                            const resp = res.data;
                            console.log(resp.data,resp.message,resp.code)
                            if(resp.flag){
                                localStorage.setItem('admin',JSON.stringify(resp.data.admin));
                                localStorage.setItem('token',JSON.stringify(resp.data.token));
                                this.$router.push("/");
                            }else {
                                this.$message.error(resp.message)
                            }
                        }).catch(err=>{
                                console.log(err);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    body {
        margin: 0 auto;
    }
    .login {
        position: absolute;
        background-image: url("../assets/login.jpg") ;
        background-repeat: no-repeat;
        top:0px;
        right: 0px;
        left: 0px;
        bottom: 0px;
        overflow-y: auto;

    }
    .login-form {
        border: 3px ;
        margin: 300px auto;
        width: 550px;
        padding:  10px;
        border-radius: 10px;
        background-color: rgba(216, 219, 222, 0.6);
    }
    .login-title{
        color: white;
        text-align: center;
    }
    .login-table {
        width: 100%;
        text-align: center;
    }
    .margin /deep/.el-form-item__content{
        margin-left: 0!important;
    }
    .margin1 {
        width: 400px;
        margin: 0 auto 22px;

    }
</style>