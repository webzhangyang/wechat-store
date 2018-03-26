<template>
  <header class="nav fixed">
    <!--点击go-back元素会启动window.history.back()-->
    <div class="nav-l go-back" @click="forBack" v-if="showBack">
      <i class="icon-base i-back"></i>
    </div>
    <div class="nav-m">{{title}}</div>
    <div class="nav-r show-mask" v-if="showInfo">{{info}}</div>
  </header>
</template>

<script>
    export default {
        name: "header-bar",
      props:['title'],
      data(){
          return {
            showBack:1,
            showInfo:0,
            info:'删除'
          }
      },
      methods:{
        forBack(){
            this.$emit('change');
            this.$emit('active');
            this.$router.go(-1);
            // this.$emit('active')
          }
      }
    }
</script>
<style scoped>

</style>
