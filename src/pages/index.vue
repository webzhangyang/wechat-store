<template>
  <div class="yy-container relative">
    <Header :title="title" @active="forActive" @change="changeDirection"></Header>
    <transition :name="direction">
      <keep-alive>
        <router-view class="router-view" ></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <Aside v-show="mask" @command="changeShow"></Aside>
    </transition>

    <Footer :list="list" @command="changeShow" @for-left="leftDire"></Footer>
  </div>
</template>

<script>
  import Footer from '../components/footer-bar'
  import Header from '../components/header-bar'
  import Aside from '../components/aside-mask'

    export default {
        name: "index",
      components:{
        Footer,
        Header,
        Aside,
      },
      data(){
          return {
            mask:0,
            title:'首页1',
            arr:['首页','分类','购物车','我的'],
            footerActive:'0',
            direction:'slide-left',
            baseUrl:'http://vue.wclimb.site/images/',
            list:[
              {txt: '首页', icon: 'i-home',path:'/index/home',active:1},
              {txt: '分类', icon: 'i-classify',path:'',active:0},
              {txt: '购物车', icon: 'i-car',path:'/index/car',active:0},
              {txt: '我的', icon: 'i-my',path:'/index/user',active:0},
            ],
            htmlData:[],
          }
      },
      beforeCreate(){

      },
      created () {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.forActive();

      },
      watch:{
        '$route':'forActive',
      },
      // activated(){
      //   this.forActive()
      // },
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        // console.log(to,from,1);
        next((vm)=>{
          // vm.footerActive=vm.forActive(to.path,vm);
          // console.log(vm.title,vm.footerActive)
        });
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        // this.forActive(to.path,this);
        //this.direction='slide-left';
        next();
      },
      methods:{
          changeShow(){
            this.mask=!this.mask;
            this.list[1].active=this.mask;
            // this.axios.get('http://vue.wclimb.site/vi/list').then(data=>console.log(data))
          },
          forActive(){
            let list=this.list;
            for(let r=0,len=list.length;r<len;r++){
              if(this.$route.path===list[r].path){
                this.title=list[r].txt;
                list[r].active=1;
              }else{
                list[r].active=0;
              }
            }
          },
          changeDirection(){
            this.direction='slide-right'
          },
          leftDire(){
            this.direction='slide-left'
          },

      },
    }
</script>

<style scoped>
  .router-view{
    position: absolute;
    top:45px;
    bottom:50px;
    width:100%;
    height:auto;
    transform: translate3d(0,0,0);
    transition: transform .3s ease;
  }
  .slide-left-enter-active, .slide-left-leave-active ,
  .slide-right-enter-active  ,.slide-right-leave-active
  {
    transition: transform .3s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    will-change: transform;
    opacity: 0;
    -webkit-transform: translate3d(50px,0,0);
    transform: translate3d(50px,0,0);
  }
  .slide-left-leave-active, .slide-right-enter {
    will-change: transform;
    opacity: 0;
    -webkit-transform: translate3d(-50px,0,0);
    transform: translate3d(-50px,0,0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
