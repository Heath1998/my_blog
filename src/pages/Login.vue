<template >
  <div class="login-contain">
        <el-row > 
            <el-col :span="24" >
                <ctx-login></ctx-login>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import login from "@/components/login"
export default{
   name:"Login",
   components:{
       'ctx-login':login,
   }
}
    
</script>

<style scoped>
.login-contain{
    width: 80%;
    margin: 0 auto;
    max-width: 420px;
}
</style>
