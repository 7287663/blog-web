<template>
    <div>
        <Header/>
        <Navbar/>
        <Main/>
    </div>
</template>

<script>
    import Header from "../components/index/Header";
    import Navbar from "../components/index/Navbar";
    import Main from "../components/index/Main";
    export default {
        name: "Layout",
        components:{
            Header,Navbar,Main
        }
    }
</script>

<style scoped>
    .header{
        position: absolute;
        height: 50px;
        padding: 0px;
        top: 0px;
        left: 0px;
        right: 0px;
        line-height: 50px;
        background-color: #3a4550;
    }
    .navbar {
        position: absolute;
        top: 50px;
        width: 230px;
        left: 0px;
        bottom: 0px;
        overflow-y: auto;
        background-color: #545c64;
    }
    .main {
        background-color: #fcfbfb;
        position: absolute;
        left: 230px;
        top:50px;
        bottom: 0px;
        right: 0px;
        overflow-y: auto;
    }
</style>