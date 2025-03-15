<template>
  <div class="nav-box">
    <span class="text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "topnav"
}
</script>

<style scoped lang="scss">
.text{
  color: #606266;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  font-weight: 500;
  font-family: PingFang SC,sans-serif;
}
.nav-box{
  height: 30px;
  padding: 0 20px;
  cursor: pointer;
  :hover{
    color: #0fa4b3;
  }
}
</style>