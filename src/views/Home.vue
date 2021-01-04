<template>
  <div class="content">
    <div class="left">
      <div class="img">
        <el-image
          style="width: 95%; height: 95%"
          :src="admin.via"
        >
        </el-image>
      </div>
      <i v-show="admin.via" class="el-icon-circle-close" @click="handleRemove1"></i>
      <div class="upload">
        <el-upload
          class="upload-demo"
          :action="url"
          :on-preview="handlePreview1"
          :on-remove="handleRemove1"
          :on-success="handleSuccess1"
          multiple
          :limit="1"
          :file-list="fileList1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>
    <div class="middle">
      <div class="img">
        <el-image
          style="width: 95%; height: 95%"
          :src="admin.code1"
        >
        </el-image>
      </div>
      <i v-show="admin.code1" class="el-icon-circle-close" @click="handleRemove2"></i>
      <div class="upload">
        <el-upload
          class="upload-demo"
          :action="url"
          :on-preview="handlePreview2"
          :on-remove="handleRemove2"
          :on-success="handleSuccess2"
          :file-list="fileList2"
          multiple
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>
    <div class="right">
      <div class="img">
        <el-image
          style="width: 95%; height: 95%"
          :src="admin.code2"
        >
        </el-image>
      </div>
      <i class="el-icon-circle-close" @click="handleRemove3" v-show="admin.code2"></i>
      <div class="upload">
        <el-upload
          class="upload-demo"
          :action="url"
          :on-preview="handlePreview3"
          :on-remove="handleRemove3"
          :on-success="handleSuccess3"
          :file-list="fileList3"
          :multiple="false"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import {deleteUrl, getInfo,update} from "../api/admin";

  export default {
    name: "Home",
    data() {
      return {
        fileList1: [],
        fileList2: [],
        fileList3: [],
        url: 'http://192.168.0.112:8081/admin/upload',
        admin:{}
      }
    },
    methods: {
      handleRemove1(file, fileList) {
        const length = this.admin.via.lastIndexOf('/')
        deleteUrl(this.admin.via.substr(length + 1));
        this.admin.via = '';
        this.fileList1 = []
        update(this.admin);
      },
      handlePreview1(file) {
      },
      handleSuccess1(response, file, fileList) {
        this.admin.via = response.data
        update(this.admin);
      },
      handleRemove2(file, fileList) {
        const length = this.admin.code1.lastIndexOf('/')
        deleteUrl(this.admin.code1.substr(length + 1));
        this.admin.code1 = '';
        this.fileList2 = []
        update(this.admin);
      },
      handlePreview2(file) {
      },
      handleSuccess2(response, file, fileList) {
        this.admin.code1 = response.data
        update(this.admin);
      },
      handleRemove3(file, fileList) {
        const length = this.admin.code2.lastIndexOf('/')
        deleteUrl(this.admin.code2.substr(length + 1));
        this.admin.code2 = '';
        this.fileList3 = []
        update(this.admin);
      },
      handlePreview3(file) {
      },
      handleSuccess3(response, file, fileList) {
        this.admin.code2 = response.data
        update(this.admin);
      },
      handleInfo() {
        getInfo().then(res => {
            if(res.data.flag){
              this.admin = res.data.data;
            }
        })
      }
    },created() {
      this.handleInfo();
    }
  }
</script>

<style scoped>
  .content {
    margin: 10px 6px 5px 5px;
    overflow-y: auto;
    height: 70%;
  }

  i {
    position: absolute;
    top: 4%;
    right: 3%;
    font-size: 30px;
    z-index: 1;
    border-radius: 50%;
    color: #d9d8d8;
  }

  i:hover {
    color: #3a8ee6;
    cursor: pointer;
  }

  .left {
    position: relative;
    float: left;
    width: 30%;
    height: 90%;
    margin-right: 4%;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .middle {
    position: relative;
    float: left;
    width: 30%;
    height: 90%;
    margin-right: 4%;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;

  }

  .right {
    position: relative;
    float: left;
    width: 30%;
    height: 90%;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .el-image {
    margin-top: 10px;
  }

  .upload {
    padding-top: 10%;
  }

  /deep/ .el-upload-list {
    display: none;
  }

  .img {
    width: 100%;
    height: 70%;
  }
</style>