<template lang="html">
  <div class="login-outter">
    <el-row>
      <el-col :span="24" >
        <el-tabs v-model="activeName" >
          <el-tab-pane label="用户登录" name="first">
            <el-col >
              <el-form :model="dynamicValidateForm" label-width="100px" ref="dynamicValidateForm">
                    <el-form-item
                      prop="email"
                      label="邮箱"
                      :rules="rules.email"
                    >
                      <el-input v-model="dynamicValidateForm.email"></el-input>
                    </el-form-item>
                    <el-form-item
                    prop="password"
                    label="密码"
                    :rules = "rules.password"
                    >
                      <el-input type="password" v-model="dynamicValidateForm.password"></el-input>
                    </el-form-item>
                    <div class="button-center">
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">登录</el-button>
                    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                     </div>                   
                </el-form>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <ctx-register></ctx-register>
          </el-tab-pane>
      </el-tabs>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import register from "@/components/register";
import axios from "axios";

export default{
    name:'Login',
    components:{
        "ctx-register":register
    },
    data(){
        return {
            dynamicValidateForm: {
                email:'',
                password:''
            },
            activeName: "first",
            rules:  {
                email:[{
                    required :true,
                    message: '请输入邮箱地址',
                    trigger: 'blur'
                },
                {
                    type: 'email',
                    message: '请输入正确的邮箱格式',
                    trigger: 'blur'
                }],
                password: {
                    required :true,
                    message: '请输入密码',
                    trigger: 'blur'
                }
            }
        }
    },
    methods:{
        checkUser(opt) {
            var check = {
                useremail: opt.email,
                password: opt.password
            }
            axios.post('/api/users/login', check)
            .then( (res) => {
                if(res.data.success) {
                    this.$message({
                        type: 'success',
                        message: '登陆成功'
                    })
                    this.$store.dispatch("UserEmailLogin", check.useremail);
                    console.log(this.$store.state.userEmail);
                    this.$router.push({path:"/"});
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '账号或密码错误'
                    })  
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) =>{
                if (valid) {
                    var opt=this.dynamicValidateForm;
                    this.checkUser(opt);
                }
            })
        }
    },
    //判断是登陆还是注册
    created() {
        if(this.$route.query.login === '1') {
            this.activeName = "first";
        } 
        else {
            this.activeName = "second";
        }
    }
}
    
</script>

<style scoped>
.login-outter{
    background-color: #fff;
    padding: 20px ;
    margin-top:50px; 
}
.login-outter .button-center{
    text-align: center;
}
</style>
