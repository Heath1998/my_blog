<template>
    <div>
        <ctx-header></ctx-header>
        <div class="container">
            <el-row :gutter="30">
                <el-col :span="6">
                    <div class="left-choice-list">
                        <ul>
                            <router-link :to="{ path: '/Userinfo/baseinfo' }" tag="li" active-class="li-active" style="cursor: pointer;">个人资料</router-link>
                            <router-link :to="{ path: '/Userinfo/likeinfo' }" tag="li" active-class="li-active" style="cursor: pointer;">我的收藏</router-link>

                        </ul>
                    </div>
                </el-col>
                <el-col :span="18">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
        <ctx-footer></ctx-footer>
    </div>
</template>

<script>
import header from "@/components/header.vue"
import footer from '@/components/footer.vue'
export default {
    components:{
        "ctx-header": header,
        "ctx-footer": footer
    }
}
</script>

<style scoped>
.left-choice-list{
    background-color: #fff;
    text-align: center;
}
.left-choice-list li {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    box-sizing: border-box;
    margin-bottom: 1px;
}
.left-choice-list .li-active {
    background: #b20b13;
    color: #fff;
    
}
</style>
