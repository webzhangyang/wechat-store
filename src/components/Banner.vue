<template>
  <div ref="parentWidth" style="width:100%;">
    <ul id="list" class="bigBanner"
        :style="{width:parentW,transform:`translate3D(${movePX}px,0,0)`}"
        :class="{bannerMove:move}"
        @touchstart="tStart"
        @touchmove="tMove"
        @touchend="tEnd"
        @transitionend="keepMove"
    >
      <li class="" :style="{width:childW,height:childH}" v-for="(bVal) in banner" :key="bVal.id">
        <a href="#"><img :src="bVal.bannerImage" alt="图片暂缺"></a>
      </li>
      <li class="fill-left" v-if="banner.length>1" :style="{width:childW,height:childH}">
        <a href="javascript:void(0)"><img :src="banner[banner.length-1].bannerImage" alt="图片暂缺"></a href="javascript:void(0)">
      </li>
    </ul>
    <ul id="smallList" class="smallList">
      <li v-for="(sVal,sIndex) in banner"
          :class="{active:active===sIndex}"
          @click="forActive(sIndex)"
      ></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "banner",
      props:{
        'limit':{
            type:Number,
        },
        'bannerData':{
          type:Array,
          required:true,
        }
      },
      created(){

      },
      mounted(){
        let pTar=this.$refs.parentWidth;
        this.pw=pTar.offsetWidth;
        let that=this;
        window.onresize=function(){
          that.pw=pTar.offsetWidth;
        };
        //dom挂载后，启动一次，然后侦听器就可以被启动了
        this.keepMove();
      },
      data(){
          return {
            // Url:this.bannerUrl,
            banner:this.bannerData,
            pw:0,
            move:false,
            movePX:0,
            bLimit:this.limit,
            direction:'',
            active:0,
            timer:null,
            openWatch:true,
            touchS:{},
            touchM:{},
            touchE:{},
            touchBegin:0,
          }
      },
      watch:{

      },
      computed:{
        parentW(){
          return this.pw*this.banner.length+'px';
        },
        childW(){
          return this.pw+'px';
        },
        childH(){
          return this.pw*this.bLimit+'px';
        }
      },
      methods:{
        bannerLeft(num=1,index){
          if(this.move)return;
          clearTimeout(this.timer);
          this.openWatch=false;
          this.move=true;
          this.movePX=-this.pw;
          this.timer=setTimeout(()=>{
            let arr=this.banner;
            this.banner=[].concat(this.banner,arr.splice(0,num));
            this.move=false;
            this.movePX=0;
            this.active=index||this.banner[0].id-1;
            this.direction='Left';
          },300)
        },
        bannerRight(num=1,index){
          // if(this.move)return;
          this.move=false;
          this.openWatch=false;
          clearTimeout(this.timer);
          let arr=this.banner.splice(-num,num);
          this.banner=arr.concat(this.banner);
          this.movePX-=this.pw*num;

          this.timer=setTimeout(()=>{
            this.move=true;
            this.movePX=0;
            // this.move=false;
            this.active=index||this.banner[0].id-1;
            this.direction='Left';
          },50)
        },
        forActive(index){
          clearTimeout(this.timer);
          this.openWatch=false;
          let num=this.active-index;
          if(num>0){
            this.bannerRight(num,index);
          }else if(num<0){
            this.bannerLeft(-num,index);
          }
        },
        keepMove(){
          this.timer=setTimeout(this.bannerLeft,2700);
        },
        tStart(event){
          this.move=false;
          this.touchS=event.changedTouches[0];
          this.touchBegin=this.movePX;
          clearTimeout(this.timer);
        },
        tMove(event){
          this.touchM=event.changedTouches[0];
          let move=this.touchM['pageX']-this.touchS['pageX'];
          this.movePX=move-this.touchBegin;
          this.openWatch=false;
        },
        tEnd(event){
          this.touchE=event.changedTouches[0];
          let move=this.touchE['pageX']-this.touchS['pageX'];
          // this.movePX=move-this.touchBegin;
          if(move>this.pw/3){//right
            this.bannerRight();
          }else if(move<-this.pw/3){//left
            this.bannerLeft()
          }else{
            this.move=true;
            this.movePX=this.touchBegin;
          }
        },
      },

    }
</script>

<style scoped>
  .bigBanner{
    will-change: transition;
    position: relative;
  }
  .bigBanner.bannerMove{
    transition: transform .3s ease-in;
  }
  .fill-left{
    position: absolute;
    left:0;
    top:0;
    transform: translate3d(-100%,0,0);
  }
</style>
