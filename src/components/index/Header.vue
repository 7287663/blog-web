<template>
    <div class="header">
        <a href="#">
            <img src="@/assets/sun.png" class="logo">
            <span class="company">sunshine</span>
        </a>
        <div class="avatar">
            <el-avatar :src="via"></el-avatar>
        </div>
        <el-dropdown class="dropdown" @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateData('ruleForm')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {update} from "../../api/admin";

    export default {
        name: "Header",
        data() {
            return {
                via :'',
                username: '',
                ruleForm: {
                    password: '',
                    id: JSON.parse(localStorage.getItem('admin')).id
                },
                rules: {
                    password: [
                        {required: true, message: '密码不能为空！', trigger: 'blur'},
                        {min: 6, message: '长度不能小于6位', trigger: 'blur'}
                    ]
                },
                dialogFormVisible: false
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            handleCommand(command) {
                switch (command) {
                    case 'a':
                        this.handleUpdate();
                        break;
                    case 'b':
                        this.$confirm('确定要退出当前账号吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.loginOut();
                        }).catch(() => {
                        });
                        break;
                    default:
                        break;
                }
            },
            fetchData() {
                const admin = JSON.parse(localStorage.getItem("admin"));
                this.username = admin.username;
                this.via= admin.via;
            },
            updateData(ruleForm) {
                this.$refs[ruleForm].validate((valid)=>{
                    if(valid){
                        update(this.ruleForm).then(res => {
                            this.$message({
                                type: res.data.flag ? 'success' : 'error',
                                message: res.data.message
                            })
                            if (res.data.flag) {
                                this.dialogFormVisible = false
                                this.loginOut();
                            }
                        })
                    }else {
                        return false;
                    }
                })

            },
            handleUpdate() {
                this.dialogFormVisible = true;
                this.ruleForm.password = '';
            }, loginOut() {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                this.$router.push("/login")
            }

        }
    }
</script>

<style scoped>
    .logo {
        width: 40px;
        height: 40px;
        padding: 5px 0px 0px 10px;
    }

    .company {
        position: absolute;
        font-size: 20px;
        color: white;
        padding-left: 5px;
    }

    .dropdown {
        float: right;
        font-size: 20px;
        color: white;
        right: 20px;
    }

    .el-dropdown-link {
        cursor: pointer;
    }
    .avatar {
        display: inline-block;
        right: 110px;
        position: absolute;
        top: 5px;
    }


</style>