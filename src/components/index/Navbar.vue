<template>
    <div class="navbar">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                        :router="true"
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="/home">
                        <i class="el-icon-eleme"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="/blog/">
                        <i class="el-icon-reading"></i>
                        <span slot="title">博客管理</span>
                    </el-menu-item>
                    <el-menu-item index="/tag/" >
                        <i class="el-icon-collection-tag"></i>
                        <span slot="title">标签管理</span>
                    </el-menu-item>
                    <el-menu-item index="/user/">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .el-menu {
        border-right: none;
    }
</style>