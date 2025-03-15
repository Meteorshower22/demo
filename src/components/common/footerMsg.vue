<template>
<div class="i-footer">
  <p class="t-footer">{{ti}}</p>
  <p class="n-footer" :key="key" v-for="(i,key) in na">{{i}}</p>
</div>
</template>

<script>
export default {
  name: "footerMsg",
  props:{
    ti:String,
    na:[]
  }
}
</script>

<style scoped>
.i-footer{
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding-left: 40px;
  font-size: 14px;
}
.t-footer{
  color: #fff;
  line-height: 40px;
  margin-bottom: 10px;
}
.n-footer{
  color: #c0c4cc;
  line-height: 30px;
  position: relative;
  transition: ease 0.2s;
  margin: 0;
}
.n-footer:hover{
  color: #FFFFFF;
}
</style>