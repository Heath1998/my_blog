<template>
    <div>
        <wbc-nav></wbc-nav>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <div class="shareTitle">
                    <div class="ui label">
                        <a href="#">{{classifyStr}}</a>
                    </div>
                    </div>
                    <wbc-sharelist></wbc-sharelist>
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <wbc-rightlist></wbc-rightlist>
                </el-col>
            </el-row>
        </div>
        <wbc-footer></wbc-footer>
    </div>
</template>

<script>
import header from '@/components/header.vue'
import footer from '@/components/footer.vue'
import temSharelist from '@/components/temSharelist.vue'
import temRightlist from '@/components/temRightlist.vue'
    export default {
        data() { //选项 / 数据
            return {
                classifyStr:''
            }
        },
        methods: { //事件处理器

        },
        components: { //定义组件
            'wbc-nav':header,
            'wbc-sharelist':temSharelist,
            'wbc-rightlist':temRightlist,
            'wbc-footer':footer
        },
        watch:{
            '$route':function(newval,old) {
                if(this.$route.query.classify === '1') {
                    this.classifyStr = "技术分享";
                } 
                else if(this.$route.query.classify === '2') {
                    this.classifyStr = "创作集";
                }
                else if(this.$route.query.classify === '3'){
                    this.classifyStr = "杂谈";
                }
                else {
                    this.classifyStr = "";
                }
            }  
        },
        created() { //生命周期函数
            if(this.$route.query.classify === '1') {
                this.classifyStr = "技术分享";
            } 
            else if(this.$route.query.classify === '2') {
                this.classifyStr = "创作集";
            }
            else if(this.$route.query.classify === '3'){
                this.classifyStr = "杂谈";
            }
            else {
                this.classifyStr = "";
            }
        }
    }
</script>

<style>

</style>
