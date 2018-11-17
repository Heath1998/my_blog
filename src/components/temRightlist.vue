<template>
    <div class="rightlistBox">
        <section >
            <div class="r1-head">
                <img src="https://diygod.b0.upaiyun.com/snjz.jpg" alt="">
                <h1>
                    <span>理智的</span>Heath
                </h1>
                
            </div>
            <div class="r1-body">
                <p></p>
                <div class="catch-me">
                    <div class="">
                        <el-tooltip class="item" effect="dark" content="Github" placement="top">
                            <a href="https://github.com/zehongfan"><i class="fa fa-github"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="QQ" placement="top">
                            <a href="#"><i class="fa fa-qq"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="微博" placement="top">
                            <a href="#"><i class="fa fa-weibo"></i></a>
                        </el-tooltip>
                    </div>
                    <div class="">
                        <el-tooltip class="item" effect="dark" content="微信" placement="top">
                            <a href="#"><i class="fa fa-weixin"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="CSDN" placement="top">
                            <a href="https://blog.csdn.net/qq_40646960"><i class="fa">C</i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="简历" placement="top">
                            <a href="#"><i class="fa  fa-file-word-o"></i></a>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="更多" placement="top">
                            <a href="#"><i class="fa  fa-ellipsis-h"></i></a>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </section>
        <section class="rs2" @click="addFavour">
            <p>
                Favour!!!
            </p>
            <div class="">
                <i class="el-icon-star-on"></i>
                <span>{{data_num}}</span>
            </div>
        </section>


    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data() { //选项 / 数据
            return {
                fixDo:false,
                data_num: ''
            }
        },
        methods: { //事件处理器
            getFavour() {
                axios.get('/api/getfavour')
                .then((res) => {
                    this.data_num = res.data.favour
                })
            },
            addFavour() {
                axios.get('/api/addfavour')
                .then((res) => {
                    if(res.data.succcess) {
                    
                    }
                    this.data_num +=  1;
                })
            }
        },
        created() { //生命周期函数
            this.getFavour();
        }
    }
</script>

<style>
.rightlistBox{
    position: relative;
}
.rightlistBox section {
    transition: all 0.2s linear;
    position: relative;
    background: #fff;
    padding:15px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.rightlistBox section:hover{
    transform: translate(0,-2px);
    box-shadow:0 15px 30px rgba(0,0,0,.1);
}
.rightlistBox .r1-head{
    text-align: center;
    border-radius: 4px 4px 0 0 ;
    text-align: center;
    position: relative;
    box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);
}
.rightlistBox .r1-head img{
    width:100%;
    min-height: 100px;
}
.rightlistBox .r1-head h1{
    position: absolute;
    bottom:5px;
    margin:0 0 0 -65px;
    font-size: 20px;
    letter-spacing:0.5px;
    color:#fff;
    text-shadow: 1px 1px 1px rgba(0,0,0,.7);
    font-weight: 700;
    width:130px;
    left:50%;
}
.rightlistBox .r1-head h1 span{
    opacity: 0.2;
}
.rightlistBox .r1-body p{
    font-size: 14px;
    margin:5px 0 8px 0;
    font-weight: 700;
    text-align: center;
}
.rightlistBox .r1-body .catch-me{
    text-align: center;
}
.rightlistBox .r1-body .catch-me a{
    display: inline-block;
    margin-bottom: 7px;
    position: relative;
    text-decoration: none;
}
.rightlistBox .r1-body .catch-me a:hover i{
    color:#fff;
    background: #F4692C;
}
.rightlistBox .r1-body .catch-me a i{
    display: inline-block;
    font-size: 20px;
    width:42px;
    height:42px;
    line-height: 42px;
    border-radius: 42px;
    color:rgba(0,0,0,0.5);
    background: rgba(0,0,0,0.1);
    transition: all 0.3s ease-in-out;
    font-style: normal;
    margin:0 3.2px;
}

/*************do you like me*******************/
.rightlistBox .rs2{
    /*padding:10px 0 4px 0;*/
}
.rightlistBox .rs2 p{
    color:#e51c23;
    cursor: pointer;
    font-size: 20px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-top:10px;
}
.rightlistBox .rs2 div{
    color:#e51c23;
    cursor: pointer;
    text-align: center;
    font-size: 40px;
}
.rightlistBox .rs2 div i{
    display: inline-block;
    text-align: center;
}
/**********排队来说*************/
.rightlistBox .rs3 .rs3-item{
    font-size: 13px;
    line-height: 20px;
}
.rightlistBox .rs3 .rs3-item a{
    display:block;
    padding:5px;
    transition: all .3s ease-out;
    border-bottom: 1px solid #ddd;
    margin:5px 0;
}
.rightlistBox .rs3 .rs3-item a:hover{
    background: rgba(230,244,250,.5);
    border-radius: 5px;
}
.rightlistBox .rs3 .rs3-photo{
    float:left;
}
.rightlistBox .rs3 .rs3-photo img{
    border-radius: 50%;
    width:32px;
    height:32px;
}
.rightlistBox .rs3 .rs3-inner{
    margin-left: 40px;
}
.rightlistBox .rs3 .rs3-inner .rs3-author{
    font-weight: 700;
}
.rightlistBox .rs3 .rs3-inner .rs3-text{
    font-size: 12px;
    text-align: justify;
}
.rightlistBox .rs3 .rs3-item:last-child a{
    border-bottom: none;
}
/************排队看这些***************/
.rightlistBox .rs4 li{
    padding:8px 0;
    text-align: justify;
}
.rightlistBox .rs4 li a{
    font-weight: 600;
}
.rightlistBox .rs4 li a:hover{
    color:#64609E;
}
</style>
