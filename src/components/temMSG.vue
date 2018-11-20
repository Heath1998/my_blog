<template>
    <div class="tMSGbox tcommonBox">
        <header>
            <h1>
                <a href="#/DetailShare" target="_blank">
                    留言板
                </a>
            </h1>
            
        </header>
        <section>
            <h2>可以畅所欲言</h2>
            <div class="">
                <img src="../../static/img/message0.jpg" alt="">
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        data() { //选项 / 数据
            return {
                rateValue:2,
                aid:'',
                comid:0,
            }
        },
        methods: { //事件处理器
            routeChange:function(){
            }
        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange'
         },
        components: { //定义组件

        },
        created() { //生命周期函数
            this.routeChange();
        }
    }
</script>

<style>
    .tMSGbox section h2{
        font-weight: bold;
        line-height: 24px;
    }
    .tMSGbox section div{
        margin:15px 0;
    }
</style>
