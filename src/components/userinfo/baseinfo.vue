<template>
    <div class="baseinfo-outter">
        <h3>个人资料</h3>
        <div class="baseinfo-content">
            <div class="infoimg"></div>
            <div class="info-right">
                <div class="info_id">
                    ID: asdsad
                </div>
                <div class="info_attention">
                    关注: 100
                </div>
                <div class="info_man">
                    <span id="username">用户名：{{afterName}}</span>
                    <span id="modify" @click="dialogFormVisible = true">修改资料</span>
                    <p>性别：{{afterSex}}</p>
                    <p>其他信息：fanas</p>
                    <p>其他信息：fanas</p>
                </div>
            </div>
        </div>
        <!--弹框 -->
        <el-dialog title="修改资料" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpdateData" >确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name:"baseinfo",
    data() {
        return {
        dialogFormVisible: false,
        form: {
          name: '',
          sex: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        afterName:'',
        afterSex:''
        }
    },
    methods:{
        submitPost() {
            var objData = {
                userEmail: this.$store.state.userEmail,
                username: this.form.name,
                sex: this.form.sex
            }
            axios.post('/api/users/updateUserInfo', objData)
            .then( (res) => {
                if(res.data.success) {
                    this.$message({
                        type:'success',
                        message: '修改成功'
                    });
                this.afterName = this.form.name;
                this.afterSex = this.form.sex;
                }
            })
        },
        submitUpdateData() {
           this.dialogFormVisible = false;
           this.submitPost();
        },
        getInitalData() {
            var url = "/api/users/getDetailUserInfo?userEmail=" + this.$store.state.userEmail;
            axios.get(url)
            .then( (res) => {
                if(res.data.success === false) {
                    console.log('初始化失败');
                }
                else {
                    this.afterName = res.data.userName;
                    this.afterSex = res.data.sex;
                }
            })
        }
    },
    created() {
        this.getInitalData();
    }
}
</script>

<style scoped>
.baseinfo-outter{
    padding: 0 20px 30px 20px;
    
    background: #fff;
}
.baseinfo-outter h3 {
    font-weight: bold;
    font-size: 20px;
    color: #3d3d3d;
    height: 90px;
    line-height: 90px;
    border-bottom: 1px solid #e0e0e0;
}
.info-right .info_id {
    margin-top: 16px;
    overflow: hidden;
    font-size: 14px;
}
.info-right .info_attention {
    margin-top: 8px;
    margin-bottom: 16px;
    font-size: 14px;
}
.info-right .info_man{
    border-top: 1px solid #e0e0e0;
}
.info-right .info_man p{
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #4d4d4d;
}
.info-right .info_man  #username {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #4d4d4d;
}

.info-right .info_man  #modify {
    float:right;
    cursor: pointer;
    color: #157dcf;
}
</style>
