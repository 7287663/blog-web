<template>
    <div class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:$route.path }" class="line">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
    .el-breadcrumb {
        height: 60px;
        border-radius: 4px;
        padding: 0 20px;
        margin: 5px 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .line {
        font-size: 20px;
        border-left: 3px solid #42b983;
        padding: 10px;
        margin-top: 10px;
    }
</style>