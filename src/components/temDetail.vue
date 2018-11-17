<template>
        <div class="detailBox tcommonBox">
            <span class="s-round-date">
                <span class="month">{{articleObject.month}}</span>
                <span class="day">{{articleObject.day}}</span>
            </span>
            <header>
                <h1>
                    <a href="#/DetailShare" target="_blank">
                        {{articleObject.title}}
                    </a>
                </h1>
                <h2>
                    <i class="el-icon-star-off"></i>发表于 {{articleObject.publish_time}} • <i class="el-icon-date"></i>553 次围观 • <i class="el-icon-edit"></i>活捉 11 条 •   <span class="rateBox"><el-rate v-model="rateValue"></el-rate>4.75分（4票）</span>
                </h2>
                <div class="ui label">
                    <a href="#">{{articleObject.classifyName}}</a>
                </div>
            </header>
            <div class="article-content" v-html="htmlStr">

            </div>
            <div class="dshareBox">
                分享到:
                <a href="javascript:void(0);" class="ds-weibo fa fa-fw fa-weibo" @click="shareToSinaWB"></a>
                <a href="javascript:void(0);" class="ds-qq fa fa-fw fa-qq"></a>
                <a href="javascript:void(0);" class="ds-wechat fa fa-fw fa-wechat"></a>
            </div>
            <div class="donate">
                <div class="donate-word">
                    <span @click="pdonate=!pdonate">赞赏</span>
                </div>
                <el-row :class="pdonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
                    <el-col  :span="8" :offset="4"  class="donate-item">
                        <img src="https://diygod.b0.upaiyun.com/2016-08-25_wxd.png" alt="">
                        <div class="donate-tip">
                            微信扫一扫，向我赞赏
                        </div>
                    </el-col>
                    <el-col :span="8"  class="donate-item">
                        <img src="https://diygod.b0.upaiyun.com/2016-08-25_wxd.png" alt="">
                        <div class="donate-tip">
                            微信扫一扫，向我赞赏
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
</template>

<script>
import axios from "axios";

    export default {
        data() { //选项 / 数据
            return {
                rateValue:2,
                pdonate:true,//打开赞赏控制
                list:[],
                htmlStr:``,
                articleObject:{}
            }
        },
        methods: { //事件处理器

            //获取到所有文章的对应id和题目
            getDataArticle(){
                axios.get('/api/easy_articleList.json')
                .then( (res)=>{
                    this.list=res.data
                    this.getFilterArticle()
                    this.getHtmlStr()
                })
                .catch( ()=> {

                });
            },
            //过滤整个json的数组获得需要的题目和文章aid
            getFilterArticle(){
                var Deliver=this.list.filter((x)=>{
                    return x.aid == this.$route.query.aid
                });
                this.articleObject = Deliver[0];
            },
            //获得v-html的数据
            getHtmlStr() {
                var mid = '/api/article?aid='+ this.articleObject.aid;
                axios.get(mid)
                .then((res) => {
                    this.htmlStr = res.data.html;
                })
                .catch( ()=> {

                });
            },
            //分享到新浪微博   
            shareToSinaWB: function(event){
            var _title,_source,_sourceUrl,_pic,_showcount,_desc,_summary,_site,
                _url = '',
                _pic = '';
                event.preventDefault();
                var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?title="123"';     //真实的appkey，必选参数
                    _shareUrl += '&url='+ encodeURIComponent(_url||document.location);     //参数url设置分享的内容链接|默认当前页location，可选参数
                    _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享的标题|默认当前页标题，可选参数
                    _shareUrl += '&source=' + encodeURIComponent(_source||'');
                    _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl||'');
                    _shareUrl += '&content=' + 'utf-8';   //参数content设置页面编码gb2312|utf-8，可选参数
                    _shareUrl += '&pic=' + encodeURIComponent(_pic||'');  //参数pic设置图片链接|默认为空，可选参数
                    window.open(_shareUrl,'_blank');
            }
        },
        created() { //生命周期函数
            this.getDataArticle()
        }
    }
</script>

<style>

@import '../css/github.css'; /*引入公共样式*/

/* 图标样式 */
.dshareBox .ds-weibo{
    border: 1px solid #ff763b;
    color: #ff763b;
}
.dshareBox .ds-weibo:hover{
    color: #fff;
    background: #ff763b;
}
.dshareBox .ds-qq{
    color: #56b6e7;
    border: 1px solid #56b6e7;
}
.dshareBox .ds-qq:hover{
    color: #fff;
    background: #56b6e7;
}
.dshareBox .ds-wechat{
    color: #7bc549;
    border: 1px solid #7bc549;
}
.dshareBox .ds-wechat:hover{
    color: #fff;
    background: #7bc549;
}

.tcommonBox  header h2 .el-rate,.rateBox{
    display:inline-block;
}
.tcommonBox  header h2 .el-rate i{
    font-size: 16px;
}
.detailBox .article-content{
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}
.detailBox .article-content p{
    margin:10px 0;
    line-height:24px;
}
.detailBox .viewdetail{
    margin:10px 0 ;
    line-height: 24px;
    text-align: center;
}
/*分享图标*/
.dshareBox {
    margin-top:40px;
}
.dshareBox a{
    position: relative;
    display: inline-block;
    width:32px;
    height:32px;
    font-size: 20px;
    border-radius: 50%;
    line-height: 32px;
    border: 1px solid #666;
    text-align: center;
    vertical-align: middle;
    margin:4px;
}
/*赞赏*/
.donate-word{
    margin:40px 0;
    text-align: center;
}
.donate-word span{
    display: inline-block;
    width:80px;
    height:34px;
    line-height: 34px;
    color:#fff;
    background: #e26d6d;
    margin:0 auto;
    border-radius: 4px;
    cursor: pointer;
}
.donate-body{
    display: none;
}
.donate-body-show{
    display: block;
}
.donate-item{
    text-align: center;
}
.donate-item img{
    width:100%;
    height:auto;
}
.donate-item div{
    margin:10px 0;
}
.donate-body .donate-item:first-of-type div{
    color:#44b549;
}
.donate-body .donate-item:nth-of-type(2) div{
    color:#00a0e9;
}
</style>
