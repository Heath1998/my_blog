import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/Home.vue'
// import Share from '@/pages/Share.vue'
// import DetailShare from '@/pages/DetailShare.vue'
// import Reward from '@/pages/Reward.vue'
// import Message from '@/pages/Message.vue'
// import Aboutme from '@/pages/Aboutme.vue'
// import Login from '@/pages/Login.vue'
// import UserInfo from '@/pages/UserInfo.vue'
// import baseinfo from '@/components/userinfo/baseinfo.vue'
// import likeinfo from '@/components/userinfo/likeinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/pages/Home.vue'], resolve),
      redirect:'/Home',
     
    },//默认首页
    {
      path:'/Home',
      component: resolve => require(['@/pages/Home.vue'], resolve),
    
    },//首页
    {
      path:'/Share',
      component: resolve => require(['@/pages/Share.vue'], resolve),
    
    },//分类
    {
      path:'/DetailShare',
      component: resolve => require(['@/pages/DetailShare.vue'], resolve),
   
    },//分享详情
    {
      path:'/Reward',
      component: resolve => require(['@/pages/Reward.vue'], resolve),
    
    },//赞赏
    {
      path:'/Message',
      component: resolve => require(['@/pages/Message.vue'], resolve),
   
    },//留言板
    {
      path:'/Aboutme',
      component: resolve => require(['@/pages/Aboutme.vue'], resolve),
     
    },//关于
    {
      path:'/Login',
      component: resolve => require(['@/pages/Login.vue'], resolve),
     
    },//关于
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: resolve => require(['@/pages/UserInfo.vue'], resolve),
      children:[
        {
          path: 'baseinfo',
          name: 'baseinfo',
          component: resolve => require(['@/components/userinfo/baseinfo.vue'], resolve),
        },
        {
          path: 'likeinfo',
          name: 'likeinfo',
          component: resolve => require(['@/components/userinfo/likeinfo.vue'], resolve),
        }
      ]
    }
  ]
})
