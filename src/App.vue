<template>
  <div id="app" class="full-height" oncontextmenu="return false;">
    <router-view class="full-height"/>
  </div>
</template>

<script>


export default {
  name: 'App',
  methods:{
    forFalse(){
      return false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*!*text-align: center;*!*/
  /*color: #2c3e50;*/
  /*!*margin-top: 60px;*!*/
}

</style>
