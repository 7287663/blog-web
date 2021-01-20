<template>
  <div class="table">
    <div class="search1">
      <el-form ref="searchMap" :inline=true :model="searchMap" class="demo-form-inline form">
        <el-form-item label="">
          <el-input v-model="searchMap.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchMap.authorName" placeholder="作者名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchMap.tagName" placeholder="标签名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchMap.isTop" placeholder="是否置顶">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchMap.isPutWay" placeholder="是否上架">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchMap.hot" placeholder="排序">
            <el-option label="热门" value="1"></el-option>
            <el-option label="时间" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" circle @click="search"></el-button>
          <el-button icon="el-icon-close" circle @click="resetForm"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle @click="handleAdd"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <el-table
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" width="200px">
        </el-table-column>
        <el-table-column width="200px"
                         prop="title"
                         label="标题"
        >
        </el-table-column>
        <el-table-column width="500px"
                         prop="summary"
                         label="摘要">
        </el-table-column>
        <el-table-column
          prop="authorName"
          label="作者名称"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="isTop"
          label="是否置顶"
          width="200px">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              v-if="scope.row.isTop === 1"
              type="success"
              effect="dark">
              {{scope.row.isTop | type}}
            </el-tag>

            <el-tag
              size="medium"
              v-else
              type="info"
              effect="dark">
              {{scope.row.isTop | type}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="isPutWay"
          label="是否投放"
          width="200px">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              v-if="scope.row.isPutWay === 1"
              type="success"
              effect="dark">
              {{scope.row.isPutWay | type}}
            </el-tag>
            <el-tag
              size="medium"
              v-else
              type="info"
              effect="dark">
              {{scope.row.isPutWay | type}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="tagName"
          label="标签名称"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="readNum"
          label="阅读数"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="likeNum"
          label="喜欢数"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="commentNum"
          label="评论数"
          width="200px">
          <template slot-scope="scope">
            <el-tag class="tag" @click="showComment(scope.row.id)">{{scope.row.commentNum}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              v-if="scope.row.isTop === 1 "
              @click="handleTop(scope.row.id)">取消
            </el-button>
            <el-button
              size="mini"
              type="success"
              v-else
              @click="handleTop(scope.row.id)">置顶
            </el-button>

            <el-button
              size="mini"
              v-if="scope.row.isPutWay === 1 "
              @click="handlePut(scope.row.id)">草稿
            </el-button>
            <el-button
              size="mini"
              type="success"
              v-else
              @click="handlePut(scope.row.id)">发布
            </el-button>

            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row.id)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 50, 100]"
        layout="sizes,total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>


      <el-dialog title="评论列表" :visible.sync="dialogCommentVisible" width="60%">
        <template>
          <el-table
            :data="commentList"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              prop="content"
              label="内容"
            >
            </el-table-column>
            <el-table-column
              prop="likeNum"
              label="喜欢数">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteCommon(scope.row.id)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-pagination
          small
          background
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="page"
          :page-size="size"
          :page-sizes="[10, 50, 100]"
          layout="sizes,total, prev, pager, next, jumper"
          :total="total1">
        </el-pagination>
      </el-dialog>


      <el-dialog title="博客操作" :visible.sync="dialogFormVisible" width="60%" :close-on-click-modal=false>
        <el-form :model="form" :rules="rules" ref="form" class="dialog">
          <el-form-item prop="title">
            <el-input type='textarea' :autosize="{ minRows: 2, maxRows: 4}" v-model="form.title"
                      placeholder="标题"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input type='textarea' :autosize="{ minRows: 3, maxRows: 5}" v-model="form.summary"
                      placeholder="摘要"></el-input>
          </el-form-item>
          <el-form-item class="image">
            <el-image
              style="width: 148px; height: 148px"
              :src="form.coverUrl"
              v-show="form.coverUrl"
            ></el-image>
            <span class="el-icon-close close" v-show="form.coverUrl" @click="handleRemove"></span>
            <el-upload
              class="upload-demo"
              :action="url"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              multiple
              v-show="!form.coverUrl"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="tagName">
            <el-select v-model="form.tagName" placeholder="请选择标签" @change="add">
              <el-option v-for="list in tagList"
                         :key="list.id"
                         :label="list.name"
                         :value="list"
                         v-show="list.id !== 1"
              ></el-option>
            </el-select>
          </el-form-item>
          <v-md-editor v-model="form.content" :disabled-menus="[]" @upload-image="handleUploadImage" height="400px"></v-md-editor>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="form.id === null ? addBlog('0','form') : updateBlog('0','form')">保
            存
          </el-button>
          <el-button type="success" @click="form.id === null ? addBlog('1','form') : updateBlog('1','form')">发
            布
          </el-button>
        </div>
      </el-dialog>

    </template>
  </div>
</template>

<script>
  import {blogList, updateBlogTop, deleteBlog, putWayBlog, getBlog, updateBlog, addBlog} from "../api/blog";
  import {tagList} from "../api/tag";
  import {getCommentList, deleteComment} from "../api/common";
  import {deleteUrl,upload} from "../api/admin";
  import URL from '../utils/utils'

  export default {
    name: "Blog",
    data() {
      return {
        url: URL.UPLOAD_URL,
        disabled: false,
        dialogImageUrl: '',
        dialogVisible: false,
        commentList: [],
        blogId: '',
        page: 1,
        size: 10,
        total1: 0,
        dialogCommentVisible: false,
        tagList: [],
        list: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
        searchMap: {
          title: '',
          authorName: '',
          hot: '',
          isTop: '',
          tagName: '',
          isPutWay: '',
          tagId: ''
        },
        dialogFormVisible: false,
        form: {
          id: null,
          title: '',
          summary: '',
          content: '',
          isPutWay: '',
          tagId: '',
          tagName: '',
          coverUrl: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {max: 50, message: '长度不能超过50', trigger: 'blur'}
          ],
          tagName: [
            {required: true, message: '请选择标签', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleUploadImage(event, insertImage, files){
        // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
        let formData = new FormData();
        formData.append('file',files[0])
        upload(formData).then(res=>{
            if(res.data.flag){
              insertImage({
                url: res.data.data,
                width: 'auto',
                height: 'auto',
              });
            }
        })
      },
      handleRemove(file, fileList) {
        const length = this.form.coverUrl.lastIndexOf('/')
        deleteUrl(this.form.coverUrl.substr(length + 1));
        this.form.coverUrl = '';
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSizeChange1(val) {
        this.size = val;
        this.fetchCommentList(this.blogId);
      },
      handleCurrentChange1(val) {
        this.page = val;
        this.fetchCommentList(this.blogId);
      },
      handleSuccess(response, file, fileList) {
        this.form.coverUrl = response.data;
        console.log(this.dialogImageUrl)
      },
      showComment(id) {
        this.dialogCommentVisible = true
        this.fetchCommentList(id);
        this.blogId = id;
      },
      fetchCommentList(id) {
        getCommentList(this.page, this.size, id).then(res => {
          if (res.data.flag) {
            this.commentList = res.data.data.records;
            this.total1 = res.data.data.total
          }
        })
      },
      handleDeleteCommon(id) {
        deleteComment(id).then(res => {
          this.$message({
            type: res.data.flag ? 'success' : 'error',
            message: res.data.message
          })
          if (res.data.flag) {
            this.fetchCommentList(this.blogId);
          }
        })
      },
      add(val) {
        this.form.tagName = val.name
        this.form.tagId = val.id
      },
      handleAdd() {
        this.dialogFormVisible = true;
        this.form.id = null;
        this.form.title = '';
        this.form.summary = '';
        this.form.content = '';
        this.form.isPutWay = '';
        this.form.tagId = '';
        this.form.tagName = '';
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData();
      },
      fetchData() {
        blogList(this.currentPage, this.pageSize, this.searchMap).then(res => {
          this.list = res.data.data.records;
          this.total = res.data.data.total;
        })
      },
      search() {
        this.fetchData();
      },
      resetForm() {
        this.searchMap = {};
        this.fetchData();
      },
      handleTop(id) {
        updateBlogTop(id).then(res => {
          this.$message({
            type: res.data.flag ? 'success' : 'error',
            message: res.data.message
          })
          if (res.data.flag) {
            this.fetchData();
          }
        })
      },
      handleEdit(id) {
        this.dialogFormVisible = true;
        getBlog(id).then(res => {
          if (res.data.flag) {
            this.form.id = res.data.data.id;
            this.form.title = res.data.data.title;
            this.form.summary = res.data.data.summary;
            this.form.content = res.data.data.content;
            this.form.tagId = res.data.data.tagId;
            this.form.tagName = res.data.data.tagName;
            this.form.coverUrl = res.data.data.coverUrl;
            // if(this.form.coverUrl){
            //   this.dialogVisible = true;
            // }
            // console.log(this.form)
          }
        });
      },
      handleDelete(id) {
        this.$confirm('确定删除此条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBlog(id).then(res => {
            const resp = res.data;
            this.$message({
              type: resp.flag ? 'success' : 'error',
              message: resp.message
            })
            this.fetchData();
          })
        }).catch(() => {
        })
      },
      handlePut(id) {
        putWayBlog(id).then(res => {
          this.$message({
            type: res.data.flag ? 'success' : 'error',
            message: res.data.message
          })
          if (res.data.flag) {
            this.fetchData();
          }
        })
      },
      addBlog(id, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.isPutWay = 1;
            addBlog(this.form).then(res => {
              this.$message({
                type: res.data.flag ? 'success' : 'error',
                message: res.data.message
              })
              if (res.data.flag) {
                this.dialogFormVisible = false;
                this.fetchData();
              }
            })
          } else {
            return false;
          }
        });
      },
      updateBlog(id, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.isPutWay = id;
            updateBlog(this.form).then(res => {
              this.$message({
                type: res.data.flag ? 'success' : 'error',
                message: res.data.message
              })
              if (res.data.flag) {
                this.dialogFormVisible = false;
                this.fetchData();
              }
            })
          } else {
            return false;
          }
        });
      }, fetchTagList() {
        tagList().then(res => {
          if (res.data.flag) {
            this.tagList = res.data.data;
          }
        })
      }
    },
    created() {
      this.fetchData();
      this.fetchTagList();
    }, filters: {
      type(type) {
        return type === 1 ? '是' : '否'
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }

  .search1 {
    margin-bottom: 20px;
    padding: 20px 0;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .form .el-form-item {
    margin-bottom: 0;
  }

  .form {
    padding-left: 10px;
  }

  /deep/ .el-table__row td {
    text-align: center;
  }

  /deep/ .has-gutter th {
    text-align: center;
  }

  .form .el-input {
    width: 150px;
  }

  .form .el-select {
    width: 150px;
  }

  .dialog .el-select {
    width: 100%;
  }

  .tag {
    cursor: pointer;
  }


  .el-upload {
    float: left;
    position: relative;
  }

  .el-image {
    float: left;
    border: 2px dashed #d7d6d6;
    margin-right: 20px;
  }

  /deep/ .el-upload-list {
    display: none;
  }

  .close {
    width: 20px;
    height: 20px;
    background-color: rgba(229, 215, 215, 0.8);
    border-radius: 50px;
    text-align: center;
    line-height: 20px;
    z-index: 1;
    position: relative;
    left: -43px;
    top: -7px;
    cursor: pointer;
  }
  .close:hover {
    background-color: rgba(229, 215, 215, 0.5);
  }


</style>