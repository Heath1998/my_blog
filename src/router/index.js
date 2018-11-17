import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Share from '@/pages/Share.vue'
import DetailShare from '@/pages/DetailShare.vue'
import Reward from '@/pages/Reward.vue'
import Message from '@/pages/Message.vue'
import Aboutme from '@/pages/Aboutme.vue'
import Login from '@/pages/Login.vue'
import UserInfo from '@/pages/UserInfo.vue'
import baseinfo from '@/components/userinfo/baseinfo.vue'
import likeinfo from '@/components/userinfo/likeinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Home},//默认首页
    {path:'/Home',component:Home},//首页
    {path:'/Share',component:Share},//分类
    {path:'/DetailShare',component:DetailShare},//分享详情
    {path:'/Reward',component:Reward},//赞赏
    {path:'/Message',component:Message},//留言板
    {path:'/Aboutme',component: Aboutme},//关于
    {path:'/Login',component: Login},//关于
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo,
      children:[
        {
          path: 'baseinfo',
          name: 'baseinfo',
          component: baseinfo,
        },
        {
          path: 'likeinfo',
          name: 'likeinfo',
          component: likeinfo,
        }
      ]
    }
  ]
})
