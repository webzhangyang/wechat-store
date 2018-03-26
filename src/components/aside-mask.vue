<template>
  <div class="mask">
    <div class="mask-shade close-mask" @click="hideMask"></div>
    <div class="mask-content classify-content">
      <div class="moveChild clear">
        <p class="c-content-title">
          <i class="icon-base i-black-classify"></i>
          <span class="classify-title">商品分类</span>
        </p>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
        <a class="c-content-list" href="#">
          <span>轮毂改装</span>
        </a>
      </div>
    </div>
    <div class="classify-icon close-mask">
      <i class="icon-base i-double-arrow"></i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "aside-mask",
      data(){
        return {
          t:1,
        }
      },
      methods:{
          hideMask(){
            this.$emit('command')
          }
      }
    }
</script>

<style scoped>
  .classify-content{
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    animation: moveGo ease .3s;
    -webkit-overflow-scrolling: touch;
  }
  @keyframes moveGo {
      0%{
        transform: translate3d(-100%,0,0);
      }
    100%{
      transform: translate3d(0,0,0);
    }
  }
</style>
