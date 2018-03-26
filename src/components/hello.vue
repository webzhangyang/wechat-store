<template>
  <div class="my-wel yy-container full-height relative">
    <div class="right-top"><button class="my-btn" @click="goIndex()">跳过 {{timer}}</button></div>
  </div>
</template>

<script>
    export default {
        name: "hello",
      beforeRouteEnter(to,from,next){
          next(vm=>{

          })
      },
      mounted(){
          this.forCount();
      },
      data(){
          return {
            timer:3,
          }
      },
      computed:{

      },
      watch:{

      },
      methods:{
        //跳转
          goIndex(path='/index'){
            this.$router.push({path});
          },
        // 计数
        forCount(){
          let timers=setInterval(()=>{
              if(this.timer>0){
                this.timer--;
              }else{
                clearInterval(timers);
                this.goIndex();
              }
            },1000);
        }
      }
    }
</script>

<style scoped>
  .my-wel{
    background: #fff url('../assets/images/welcome.jpeg') no-repeat center;
    background-size: 100% auto;
  }
  .right-top{
    position: absolute;
    top:10px;
    right:10px;
    line-height: 23px;
  }
  .my-btn{
    background: #eee;
    width:60px;
    border-radius:5px;
    padding:2px 5px;
    line-height: 21px;
  }
</style>
