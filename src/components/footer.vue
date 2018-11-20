<template>
    <div class="footBack">
        <div class="footer-img">

        </div>
        <div class="fcontainer">
            <p>
                博客已萌萌哒运行<span>{{runDate}}</span><span>(●'◡'●)ﾉ♥</span>
            </p>
            <p>
                托管于 <a href="#">github</a>.  提供静态文件云存储服务. <a href="#">Google Analytics</a> 提供网站统计服务. <a href="#">CloudXNS</a> 提供 DNS 解析服务.
            </p>
            <p>
                © 2018 <a href="https://archive.anotherhome.net/">Anotherhome</a>. 由 <a href="#">Vue</a> 强力驱动. Theme By <a href="https://archive.anotherhome.net/">Amativeness</a>. <a href="#">站点地图</a>. 
            </p>
            <p>
                <span>HH</span> <img class="fheart" src="../../static/img/heart02.png"/>  <span>HH.</span>
            </p>
        </div>
    </div>

</template>

<script>
    export default {
        data() { //选项 / 数据
            return {
                runDate:'',
            }
        },
        methods: { //事件处理器
            runTime:function(){//运行倒计时
                var that = this;
                var oldTime =new Date('2018/11/05 00:00:00');
                var timer = setInterval(function(){
                    var nowTime = new Date();
                    var longTime = nowTime - oldTime;
                    var days = parseInt(longTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
                        var hours = parseInt(longTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
                        var minutes = parseInt(longTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                        var seconds = parseInt(longTime / 1000 % 60, 10);//计算剩余的秒数
                        that.runDate = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒";
                },1000)
            }
        },
        components: { //定义组件

        },
        created() { //生命周期函数
        //替换底部图片
        var that = this;
        that.runTime();
        }
    }
</script>

<style>
.footBack{
    color:#888;
    margin-top: -10px;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
    position: relative;
    min-height: 368px;
}
.footBack .fcontainer{
    width:100%;
    background: #232323;
    top:294px;
    left:0;
    position: absolute;
    padding:15px 0 10px 0;
    z-index: 1;
    width: 100!important;
}
.footBack .footer-img{
    background:url(../../static/img/footer01.png) no-repeat 50%;
    height:368px;
    z-index: 2;
    position: absolute;
    width:100%;
}
.footBack p{
    margin:5px 0;
}
.footBack a{
    color:#888;
}
.footBack a:hover{
    color:#000;
}
.footBack .fheart{
    width:25px;
    height:25px;
    margin-top:-10px;
    top:5px;
    position: relative;

    /*padding-top:0px;*/
    vertical-align: baseline;

    -webkit-animation: heartScale 1.33s ease-in-out infinite;
    animation: heartScale 1.33s ease-in-out infinite;
}
@keyframes heartScale {
    0%{transform: scale(1)}
    50%{transform: scale(0.8)}
    100%{transform: scale(1)}
}
</style>
