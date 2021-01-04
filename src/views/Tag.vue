<template>
    <div class="table">
        <div class="search">
            <el-button type="primary" icon="el-icon-edit" class="btn-add" @click="handleAdd">新增</el-button>
        </div>

        <el-dialog title="标签操作" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" label-width="80px">
                <el-form-item label="标签名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标签排序">
                    <el-input v-model="form.tagSort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="form.id === null ? addData() : updateData()">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-table
                :data="list"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="tagSort"
                    label="排序"
                    align="center">
            </el-table-column>
            <el-table-column
              prop="clickNum"
              label="点击量"
              align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
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
    </div>
</template>

<script>
    import {tagList, addTag, getById, deleteById, update} from "../api/tag.js";

    export default {
        name: "Tag",
        data() {
            return {
                dialogFormVisible: false,
                list: [],
                form: {
                    id: null,
                    name: '',
                    tagSort: ''
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                tagList().then(res => {
                    this.list = res.data.data;
                })
            },
            handleAdd() {
                this.dialogFormVisible = true;
                this.form.id = null;
                this.form.name = '';
                this.form.tagSort = '';
            },
            addData() {
                addTag(this.form).then(res => {
                    const resp = res.data;
                    if (resp.flag) {
                        this.$message.success(resp.message);
                        this.fetchData();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error(resp.message);
                    }
                }).catch(err => {
                    this.$message.error(err.message)
                })
            },
            updateData() {
                update(this.form).then(res => {
                    const resp = res.data;
                    if (resp.flag) {
                        this.$message.success(resp.message);
                        this.fetchData();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error(resp.message);
                    }
                }).catch(err => {
                    this.$message.error(err.message)
                })
            },
            handleEdit(id) {
                this.dialogFormVisible = true;
                getById(id).then(res => {
                    if (res.data.flag) {
                        this.form = res.data.data;
                    }
                })
            },
            handleDelete(id) {
                this.$confirm('确定删除此条数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteById(id).then(res => {
                        const resp = res.data;
                        this.$message({
                            type: resp.flag ? 'success' : 'error',
                            message: resp.message
                        })
                        this.fetchData();
                    }).catch(err => {
                        this.$message.error(err.message)
                    });
                }).catch(() => {
                })

            }
        }
    }
</script>

<style scoped>
    .btn-add {
        margin-right: 20px;
    }
</style>