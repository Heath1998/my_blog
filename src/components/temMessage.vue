<template>
    <div class="tmsgBox" id="tmsgBox" >
        <div class="tmsg-respond" id="respondChild">
            <h3>发表评论 <small v-show="isRespond" class="tcolorm" @click="removeRespond">取消回复</small></h3>
            <form class=""  >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="说点什么呢``"
                  v-model="textarea">
                </el-input>

                <el-row class="tmsg-r-info">
                    <el-col :span="24" class="info-submit">
                        <p class="tcolors-bg" @click="sendMsg">{{sendTip}}</p>
                    </el-col>
                </el-row>
            </form>
        </div>
        <div class="tmsg-comments" id="tmsgComments">
            <a href="#" class="tmsg-comments-tip">活捉 {{commentList.length}} 条</a>
            <div class="tmsg-commentshow">
                <ul class="tmsg-commentlist">
                    <li class="tmsg-c-item" v-for="(commentItem,index) in commentList" :key="index">
                        <article class="">
                            <header>
                                <img  src="../../static/img/tou.jpg"  onerror="this.onerror=null;this.src='../../static/img/tou.jpg'">
                                <div class="i-name">
                                   {{commentItem.user}}
                                </div>
                                <div class="i-class">
                                    天然呆
                                </div>
                                <div class="i-time">
                                    <time>{{commentItem.date}}</time>
                                </div>
                            </header>
                            <section>
                                <p>{{commentItem.commentText}}</p>
                                <div v-if="true" class="tmsg-replay" @click="respondMsg(commentItem.commentId, commentItem.user)">
                                    回复
                                </div>
                            </section>
                        </article>
                        <ul v-show="commentItem.childernTextArrary" class="tmsg-commentlist" style="padding-left:60px;">
                            <li class="tmsg-c-item" v-for="(replyItem,rindex) in commentItem.childernTextArrary" :key="rindex">
                                <article class="">
                                    <header>
                                            <img src="../../static/img/tou.jpg"  onerror="this.onerror=null;this.src='../../static/img/tou.jpg'">
                                            <div class="i-name">
                                                {{replyItem.user}} <span>回复</span> {{replyItem.userReply}}
                                            </div>
                                            <div class="i-class">
                                                天然呆
                                            </div>
                                            <div class="i-time">
                                                <time>{{replyItem.date}}</time>
                                            </div>
                                    </header>
                                    <section>
                                        <p>{{replyItem.replyText}}</p>
                                        <div v-show="true" class="tmsg-replay" @click="respondMsg(commentItem.commentId, replyItem.user)">
                                            回复
                                        </div>
                                    </section>
                                </article>
                            </li>
                        </ul>
                    </li>

                </ul>
                <h1 v-show='hasMore' class="tcolors-bg" @click="addMoreFun" >查看更多</h1>
                <h1 v-show='!hasMore' class="tcolors-bg" >没有更多</h1>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data() { //选项 / 数据
            return {
                commentList:[],
                isRespond:false,
                textarea: '',//文本框输入内容
                hasMore:true,
                haslogin:false,
                userId:'',
                leaveId:0,//回复评论的当前的commentId
                sendTip:'发送~',
                commentGradeId: '', //评论在那个层级
                commentReplyUser: '', //回复评论的用户
                visitorLocalStorageId: '', //用户
                commentTableName: '', //评论表的名字
                replyTableName: '', //回复表的名字
                urlParam:''  //url的参数后端识别那个评论表
            }
        },
        methods: { //事件处理器
          //发送留言
          sendComment: function() {
            var obj = {
                commentText: this.textarea,
                articleId: this.$route.query.aid,
                user: this.visitorLocalStorageId
            };
            var url = '/api/sendcomment' + this.urlParam;
            axios.post(url, obj)
            .then((res) => {
                if(res.data.success) {
                    this.$message({
                        message:'成功发送评论',
                        type: 'success'
                    });
                    this.getCommentList();
                }
            })
            .catch(() => {
            })
          },
          sendReply: function() {
            var obj = {
                  commentId: this.commentGradeId,
                  userReply: this.commentReplyUser,
                  user: this.visitorLocalStorageId,
                  replyText: this.textarea,
                  articleId: this.$route.query.aid
              };
              var url = '/api/sendreply' + this.urlParam;
              axios.post(url, obj)
              .then((res) => {
                if(res.data.success) {
                    this.$message({
                        type:'success',
                        message:'回复成功'
                    })
                    this.getCommentList();
                }
              })
              .catch(() => {});
          },
          sendMsg:function(){//留言
            if(this.isRespond) {
                this.sendReply();
                this.tmsgBox.insertBefore(this.respondBox,this.listDom);
            }
            else {
                this.sendComment();
            }
          },
          respondMsg:function(id, user){//回复留言
              var dom = event.currentTarget;
              dom = dom.parentNode;
              this.isRespond = true;
              dom.appendChild(this.respondBox);
              this.commentGradeId = id;
              this.commentReplyUser = user;
          },
          removeRespond:function(){//取消回复留言
              this.isRespond = false;
              this.tmsgBox.insertBefore(this.respondBox,this.listDom);
          },

          addMoreFun:function(){//查看更多
              this.showCommentList(false);
          },
        createTable:function() {
            var sendUrlStr = '/api/createTable' + this.urlParam;
            axios.get(sendUrlStr)
            .then( (res) => {
                if(!res.data.success) {
                    console.log('err')
                }
            })
        },
        getCommentList:function() {
            var getReviewUrl = "/api/getReview" + this.urlParam;
            axios.get(getReviewUrl)
            .then((res) => {
                this.commentList = res.data;
                this.commentList = this.commentList.reverse();
            })
            .catch(() => {

            })
        },
        getUserName:function() {
            var userNameUrl = "/api/users/getDetailUserInfo?userEmail=" + localStorage.getItem("userEmail");
            axios.get(userNameUrl)
            .then( (res) => {
                if(res.data.success == false) {

                }
                else {
                    this.visitorLocalStorageId = res.data.userName;
                    console.log('this.visitorLocalStorageId')
                }
            })
            .catch(() => {
				//
			});
        },
        initDataTableName:function() {
            if(this.$route.path.indexOf('Aboutme') >= 0) {
                this.urlParam = '?aboutMeMessage=1';
            }
            else if(this.$route.path.indexOf('Message') >= 0) {  
                this.urlParam = '?messageBoard=1';       
            }
            else {     
                this.urlParam = '?articleId=' + this.$route.query.aid;              
            }
        }
        
        },

        created() { //生命周期函数
            this.initDataTableName();
            this.createTable();
            this.getCommentList();
            if(localStorage.getItem("userEmail")) {
                this.getUserName();
            }
            else if(!localStorage.getItem("visitorID")) {
                this.visitorLocalStorageId = Math.ceil(Math.random()*10000);
                this.visitorLocalStorageId = "游客" + this.visitorLocalStorageId;
                localStorage.setItem("visitorID", this.visitorLocalStorageId);
                this.visitorLocalStorageId = localStorage.getItem("visitorID");
            }
            else {
                this.visitorLocalStorageId = localStorage.getItem("visitorID");
            }
        },
        mounted(){//页面加载完成后
            //获取页面元素
            this.respondBox = document.getElementById('respondChild');
            this.tmsgBox = document.getElementById('tmsgBox');
            this.listDom = document.getElementById('tmsgComments');
            // console.log(this.respondBox);
        }
    }
</script>

<style>
.tmsgBox{
    position: relative;
    background: #fff;
    padding:15px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.tmsg-respond h3{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}
.tmsg-respond h3 small{
    font-size: smaller;
    cursor: pointer;
}
.tmsg-respond textarea{
    background:#f4f6f7;
    height:100px;
    margin-bottom: 10px;
}
.OwO{
    position: relative;
    z-index: 1;
}
.OwO .OwO-logo{
    position: relative;
    border-radius: 4px;
    color:#444;
    display: inline-block;
    background: #fff;
    border:1px solid #ddd;
    font-size: 13px;
    padding:0 6px;
    cursor: pointer;
    height:30px;
    box-sizing: border-box;
    z-index: 2;
    line-height: 30px;
}
.OwO .OwO-logo:hover{
    animation:a 5s infinite ease-in-out;
    -webkit-animation:a 5s infinite ease-in-out;
}
.OwO .OwO-body{
    position: absolute;
    background: #fff;
    border:1px solid #ddd;
    z-index: 1;
    top:29px;
    border-radius: 0 4px 4px 4px;
    display: none;
}
.OwO-open .OwO-body{
    display: block;
}
.OwO-open .OwO-logo{
    border-radius: 4px 4px 0 0;
    border-bottom: none;
}
.OwO-open .OwO-logo:hover{
    animation:none;
    -webkit-animation:none;
}
.OwO .OwO-items {
    max-height: 197px;
    overflow: scroll;
    font-size: 0;
    padding:10px;
    z-index: 1
}
.OwO .OwO-items .OwO-item{
    background: #f7f7f7;
    padding:5px 10px;
    border-radius: 5px;
    display: inline-block;
    margin: 0 10px 12px 0;
    transition: 0.3s;
    line-height: 19px;
    font-size: 20px;
    cursor: pointer;
}
.OwO .OwO-items .OwO-item:hover{
    background: #eee;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
                0 3px 1px -2px rgba(0,0,0,.2),
                0 1px 5px 0 rgba(0,0,0,.12);
    animation:a 5s infinite ease-in-out;
    -webkit-animation:a 5s infinite ease-in-out;
}
.OwO .OwO-body .OwO-bar{
    width:100%;
    height:30px;
    border-top: 1px solid #ddd;
    background: #fff;
    border-radius: 0 0 4px 4px;
    color: #444;
}
.OwO .OwO-body .OwO-bar .OwO-packages li{
    display: inline-block;
    line-height: 30px;
    font-size: 14px;
    padding: 0 10px;
    cursor: pointer;
    margin-right: 3px;
    text-align: center;
}
.OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type{
    border-radius: 0 0 0 3px;
}
@-webkit-keyframes a{
    2%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    4%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    6%{-webkit-transform:translateY(1.5px) rotate(-1.5deg);transform:translateY(1.5px) rotate(-1.5deg)}
    8%{-webkit-transform:translateY(-1.5px) rotate(-1.5deg);transform:translateY(-1.5px) rotate(-1.5deg)}
    10%{-webkit-transform:translateY(2.5px) rotate(1.5deg);transform:translateY(2.5px) rotate(1.5deg)}
    12%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    14%{-webkit-transform:translateY(-1.5px) rotate(1.5deg);transform:translateY(-1.5px) rotate(1.5deg)}
    16%{-webkit-transform:translateY(-.5px) rotate(-1.5deg);transform:translateY(-.5px) rotate(-1.5deg)}
    18%{-webkit-transform:translateY(.5px) rotate(-1.5deg);transform:translateY(.5px) rotate(-1.5deg)}
    20%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    22%{-webkit-transform:translateY(.5px) rotate(-1.5deg);transform:translateY(.5px) rotate(-1.5deg)}
    24%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    26%{-webkit-transform:translateY(.5px) rotate(.5deg);transform:translateY(.5px) rotate(.5deg)}
    28%{-webkit-transform:translateY(.5px) rotate(1.5deg);transform:translateY(.5px) rotate(1.5deg)}
    30%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    32%,34%{-webkit-transform:translateY(1.5px) rotate(-.5deg);transform:translateY(1.5px) rotate(-.5deg)}
    36%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    38%{-webkit-transform:translateY(1.5px) rotate(-1.5deg);transform:translateY(1.5px) rotate(-1.5deg)}
    40%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    42%{-webkit-transform:translateY(2.5px) rotate(-1.5deg);transform:translateY(2.5px) rotate(-1.5deg)}
    44%{-webkit-transform:translateY(1.5px) rotate(.5deg);transform:translateY(1.5px) rotate(.5deg)}
    46%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    48%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    50%{-webkit-transform:translateY(.5px) rotate(.5deg);transform:translateY(.5px) rotate(.5deg)}
    52%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    54%{-webkit-transform:translateY(-1.5px) rotate(1.5deg);transform:translateY(-1.5px) rotate(1.5deg)}
    56%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    58%{-webkit-transform:translateY(.5px) rotate(2.5deg);transform:translateY(.5px) rotate(2.5deg)}
    60%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    62%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    64%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    66%{-webkit-transform:translateY(1.5px) rotate(-.5deg);transform:translateY(1.5px) rotate(-.5deg)}
    68%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    70%{-webkit-transform:translateY(1.5px) rotate(.5deg);transform:translateY(1.5px) rotate(.5deg)}
    72%{-webkit-transform:translateY(2.5px) rotate(1.5deg);transform:translateY(2.5px) rotate(1.5deg)}
    74%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    76%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    78%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    80%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    82%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    84%{-webkit-transform:translateY(1.5px) rotate(2.5deg);transform:translateY(1.5px) rotate(2.5deg)}
    86%{-webkit-transform:translateY(-1.5px) rotate(-1.5deg);transform:translateY(-1.5px) rotate(-1.5deg)}
    88%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    90%{-webkit-transform:translateY(2.5px) rotate(-.5deg);transform:translateY(2.5px) rotate(-.5deg)}
    92%{-webkit-transform:translateY(.5px) rotate(-.5deg);transform:translateY(.5px) rotate(-.5deg)}
    94%{-webkit-transform:translateY(2.5px) rotate(.5deg);transform:translateY(2.5px) rotate(.5deg)}
    96%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    98%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    0%,to{-webkit-transform:translate(0) rotate(0deg);transform:translate(0) rotate(0deg)}
}
/*用户输入表单*/
.tmsg-r-info{
    margin:10px 0;
}
.tmsg-r-info input{
    height:30px;
    border-radius: 4px;
    background: #f4f6f7;
}
.tmsg-r-info .info-submit{
    margin: 10px 0;
    text-align: center;
}
.tmsg-r-info .info-submit p,.tmsg-commentshow h1{
    /*background: #97dffd;*/
    color:#fff;
    border-radius: 5px;
    cursor: pointer;
    /*transition: all .3s ease-in-out;*/
    height:30px;
    line-height: 30px;
    text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/*评论列表*/
.tmsg-comments .tmsg-comments-tip{
    display: block;
    border-left: 2px solid #363d4c;
    padding: 0 10px;
    margin: 40px 0;
    font-size: 20px;
}
.tmsg-commentlist {
    margin-bottom:20px;

}
.tmsg-commentshow>.tmsg-commentlist{
    border-bottom: 1px solid #e5eaed;
}
.tmsg-c-item{
    border-top: 1px solid #e5eaed;
}
.tmsg-c-item article{
    margin:20px 0;
}
.tmsg-c-item article header{
    margin-bottom:10px;
}
.tmsg-c-item article header img{
    width: 65px;
    height: 65px;
    border-radius: 50%;
    float: left;
    transition: all .4s ease-in-out;
    margin-right: 15px;
}
.tmsg-c-item article header img:hover{
    transform: rotate(360deg);
}
.tmsg-c-item article header .i-name{
    font-size: 14px;
    margin:5px 8px 7px 0;
    color:#444;
    font-weight: bold;
    display: inline-block;
}
.tmsg-c-item article header .i-class{
    display: inline-block;
    margin-left:10px;
    background: #dff0d8;
    color:#3c763d;
    border-radius: 5px;
    padding: 3px 6px;
    font-size: 12px;
    font-weight: 400;
}
.tmsg-c-item article header .i-time{
    color:#aaa;
    font-size: 12px;
}
.tmsg-c-item article section{
    margin-left: 80px;
}
.tmsg-c-item article section .tmsg-replay{
    margin:10px 0;
    font-size: 12px;
    color:#64609E;
    cursor: pointer;
}

</style>
