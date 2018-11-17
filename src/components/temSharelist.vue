<template>
    <el-row class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="index">
            <span class="s-round-date">
                <span class="month">{{item.month}}</span>
                <span class="day">{{item.day}}</span>
            </span>
            <header>
                <h1>
                    <a href="#/DetailShare" target="_blank">
                        {{item.title}}
                    </a>
                </h1>
                <h2>
                    <i class="el-icon-star-off"></i>发表于<i class="el-icon-time"></i> {{item.publish_time}} • <i class="el-icon-date"></i>553 次围观 • <i class="el-icon-edit"></i>活捉 11 条
                </h2>
                <div class="ui label">
                    <a href="#/Share">{{item.classifyName}}</a>
                </div>
            </header>
            <div class="article-content">
                <p>
                    {{item.content}}
                </p>
            </div>
            <div class="viewdetail">
                <a :href="'#/DetailShare?aid='+item.aid" target="_blank">
                    阅读全文>>
                </a>
            </div>
        </el-col>
        <el-col class="viewmore">
            <a  @click="checkHasMore">{{textMore}}</a>
        </el-col>
    </el-row>
</template>

<script>
import axios from 'axios'

    export default {
        name:'Share',
        data() { //选项 / 数据
            return {
                articleList:[],
                articleListAll:[],
                articleClassifyAll:[],
                textMore:'',
                listNum:0,
            }
        },
        methods: { //事件处理器
            getSearchData(){
                this.articleClassifyAll=this.articleListAll.filter((x)=>{
                    return x.title.indexOf(this.$route.query.keyword)>=0
                })
            },
            getListFilter(){
                this.articleClassifyAll = this.articleListAll.filter((x)=>{
                    return x.classify == this.$route.query.classify;
                })
            },
            checkHasMore(){
                if((this.listNum+5) >= this.articleClassifyAll.length){
                    this.articleList = this.articleClassifyAll
                    this.textMore = '暂无更多数据'
                }
                else{
                    this.textMore = '加载更多'
                    this.listNum += 5;
                    this.articleList = this.articleClassifyAll.slice(0,this.listNum)
                }
            },
            getIndexJson(){
                axios.get('/api/easy_articleList.json')
                .then( (res)=>{
                    this.articleListAll = res.data;
                    this.articleClassifyAll=this.articleListAll;
                    if(this.$route.query.keyword){
                        this.getSearchData();
                        this.checkHasMore() ;
                    }else if(this.$route.query.classify){
                        this.getListFilter();
                        this.checkHasMore() ;
                    }else{
                        this.checkHasMore();
                    }
                })
                .catch( () => {

                })
            }
        },
        watch:{
            $route(newval,oldval){
                if(this.$route.query.keyword){
                    this.getSearchData()
                }
                if(this.$route.query.classify){
                    this.getListFilter()
                }
                this.checkHasMore()
            },

        },
        activated(){
            this.listNum=0
            if(this.$route.path=='/'){
            this.middleList=this.articleObject
            }
            this.checkHasMore()
        },
        created() { //生命周期函数
            this.getIndexJson();
        }
    }
</script>

<style>
/*分享标题*/
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/*文章列表*/
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }

    .sharelistBox .viewmore{
        text-align: center;
        width:100%;
    }
    .sharelistBox .viewmore a{
        background:  #97dffd;
        /*padding:6px 0;*/
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        color:#fff;
        height:30px;
        line-height: 30px;
        display: block;
        cursor: pointer;
    }
    .sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
        background: #48456C;
    }
    /*.sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
        background: #48456C;
    }*/
</style>
