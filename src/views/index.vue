<template>
<el-container style="height: 100%">
  <el-header class="header">
    <header class="top-nav">
      <div class="logo">
       <a href="#" class="logo1 box">TODEDIT</a>
       <div class="gap"></div>
       <a href="#" class="logo2 box">iJOURNAL</a>
     </div>
     <nav class="nav">
       <topnav>期刊详情查询</topnav>
       <topnav>AI智能选刊</topnav>
       <topnav>期刊解析与推荐</topnav>
       <topnav>iThenticate查重</topnav>
       <topnav>关于我们</topnav>
       <topnav><div class="loginBtn">登录/注册</div></topnav>
     </nav>
   </header>
  </el-header>
  <div class="sidebar">
  </div>
  <RouterView class="container"/>
  <el-footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <div class="logo">
          <a href="#" class="logo1 box" style="color: white;font-weight: bold">TODEDIT</a>
          <div class="gap"></div>
          <a href="#" class="logo2 box" style="color: white;font-weight: bold">iJOURNAL</a>
        </div>
        <div>
          <p style="color: #c0c4cc;line-height: 40px;font-size: 12px;font-weight: 500;font-family: PingFang SC;">© 2019 Topedit All Rights Reserved</p>
          <img alt="这里是一张图片" style="color:#ffffff;">
        </div>
      </div>
      <footer-msg :key="index" :ti="i.ti" :na="i.na" v-for="(i,key,index) in list"/>
    </div>
  </el-footer>
</el-container>
</template>

<script>
import Topnav from "../components/common/topnav.vue";
import FooterMsg from "../components/common/footerMsg.vue";
export default {
  name: "index",
  data:()=>({
    drawer:true,
    list:[
      {ti:'iJournal平台',na:['首页','关于我们']},
      {ti:'相关服务',na:['论文服务','查重服务']},
      {ti:'战略合作伙伴',na:['投必得学术公众号','投必得学术知乎机构号','智慧科研公众号']},
      {ti:'联系我们',na:['iJournal平台客服']},
    ]
  }),
  components: {Topnav,FooterMsg}
}
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  border-bottom: 0.5px #b8b8b8 solid;
}
.top-nav{
  padding:0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
  height: 50px;
  margin: 0 auto;
  box-sizing: border-box;
}
.nav:after:last-child{
  padding-right: 0;
}
.nav{
  display: flex;
}
.nav>div:not(.nav>div:first-child){
  border-left: 1px #8c8c8c solid;
}
.box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-decoration: none;
  font-family: "iconfont",serif !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;

}
.logo{
  display: flex;
}
.gap{
  width: 1px;
  height: 30px;
  background: rgba(0, 0, 0, .2);
  margin: 0 16px;
  color: #8c8c8c;
}
.logo1{
  line-height: 26px;
  font-size: 26px;
  color: #0083ca;
  cursor: pointer;
}
.logo2{
  line-height: 26px;
  font-size: 26px;
  color: #0fa4b3;
  cursor: pointer;
}
.loginBtn{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 5px;
  height: 32px;
  background: #0fa4b3;
  font-size: 14px;
  color: #fff;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}
.container{
  width: 100%;
  margin: 0 auto;
}
.sidebar{
  position: absolute;
  top: 50px;
  bottom: 0;
  right: 0;
  width: 40px;
  padding-top: 11px;
  background: #fff;
  -webkit-box-shadow: 0 5px 6px rgba(0, 0, 0, .16);
  box-shadow: 0 5px 6px rgba(0, 0, 0, .16);
  z-index: 200;
  -webkit-transition: width .3s ease;
  transition: width .3s ease;
}
.footer{
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 250px;
  min-height: 250px;
  background-color: #202329;
  padding: 20px 0 10px;
}
.footer-content{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  width: 1180px;
  margin: 0 auto;
  flex-direction: row;
}
.footer-logo{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-right: 66px;
}
</style>