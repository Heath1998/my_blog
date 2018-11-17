export default{
   userEmail: isLoggedIn() || null , // 这里相当于给每次刷新重新设置初始值
   loading: false,
   UserList: [111,222,333], //用户列表
   themeObj: 0,//主题
   aboutmeObj:'',//关于我的信息
   host:"http://"+window.location.host+"/port/",//接口路径
   keywords:'',//关键词
}

function isLoggedIn(){
    let userEmail = localStorage.getItem('userEmail');
    if(userEmail){
        return userEmail;
    }else{
      return '';
    }
  }