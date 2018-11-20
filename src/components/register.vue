<template lang="html">
  <div class="register-outter">
    <el-form :model="registerValidateForm" label-width="100px"  ref="registerValidateForm">
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="rules.email"
          >
            <el-input v-model="registerValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item
          prop="password"
          label="密码"
          :rules = "rules.password"
          >
            <el-input type="password" v-model="registerValidateForm.password"></el-input>
          </el-form-item>
          <el-form-item
          prop="checkPass"
          label="再次输入"
          :rules = "rules.checkPass"
          >
            <el-input type="password" v-model="registerValidateForm.checkPass"></el-input>
          </el-form-item>
          <div class="button-center">
          <el-button type="primary" @click="submitForm('registerValidateForm')">注册</el-button>
          <el-button @click="resetForm('registerValidateForm')">重置</el-button>
          </div>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'login',
    data() {
        // 密码安全性要求
        let validatePass1 = (rule, value, callback) => {
            // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
            let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
            if (!reg.test(value)) {
                callback(new Error('密码长度需6-16位，且包含字母和字符'))
            } else {
                callback()
            }
        };
        // 监测两次密码是否相同
        let validatePass2 = (rule, value, callback) => {
            value === '' ? callback(new Error('请再次输入密码')) :
                value !== this.registerValidateForm.password ? callback(new Error('两次输入密码不一致!')) :
                callback()
        };
        return {
            registerValidateForm: {
                email: '',
                password: '',
                checkPass: '',
                first: 'first'
            },
            rules: {
                email: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass1,
                        trigger: 'blur'
                    }
                ],
                checkPass: [{
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        //送注册post请求信息
        sendRegisterInfo(opt) {
            var objInfo = {
                useremail: opt.email,
                password: opt.password 
            };
            axios.post('/api/users/register', objInfo)
            .then( (res) => {
                if(res.data.success) {
                    this.$message({
                        type:"success",
                        message:"请去邮箱激活"
                    });
                }
                else {
                    this.$message({
                        type:"info",
                        message:"邮箱已注册"
                    })
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let opt = this.registerValidateForm;
                    this.sendRegisterInfo(opt);
                }
            })
            }
            
    }
    
}
</script>

<style lang="css" scoped>
.register-outter .button-center {
    text-align: center;
}
</style>
