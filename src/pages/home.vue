<template>
  <section class="mobile-container default-f-s">
    <div class="clear">
      <div class="merchant">
        <div class="mer-img"><img src="http://autoround.image01.chejiamall.com/arwechatmall-net/b0b785ab9d094b2d8f918d17e2f9d738.jpg" alt=""/></div>
        <div class="mer-title">轮毂改装店家</div>
      </div>
      <div class="carousel">
        <Banner v-if="banner.length" :bannerData="banner" :limit="homeLimit"></Banner>
      </div>

      <div class="search-box extra-mar-bo">
        <div class="s-b-box">
          <i class="icon-base i-search"></i>
          <input class="input" type="text" placeholder="请输入商品名称"/>
        </div>
        <a class="s-b-search">搜索</a>
      </div>
      <div class="recommend">
        <div class="rec-title">
          <p class="transverse-line"></p>
          <p class="rec-t-text">精品推荐</p>
          <p class="transverse-line"></p>
        </div>
        <div class="rec-detail waterfall" data-pinterest="recommend">
          <div class="rec-d-row water-col" v-for="(val,pIndex) in col">
            <div class="row-detail water-detail"
                 v-for="(value,cIndex) in htmlData" v-if="cIndex%col===pIndex"
                 :key="value.id"
            >
              <a href="#/hello">
                <div class="row-d-img detail-img">
                  <img :src="value.mainImges | getImg" alt=""/>
                </div>
                <p class="row-d-text">{{value.productName}}</p>
              </a>
              <div class="row-d-info">
                <div class="info-l">
                  <p class="now-price">￥<span class="span">{{value.salesPrice}}</span></p>
                  <p class="old-price">￥<span>{{value.marketPrice}}</span></p>
                </div>
                <a class="info-r addCartNum" href="#" @click.prevent="addCount">
                  <i class="icon-base i-car-add"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend">
        <div class="rec-title">
          <p class="transverse-line"></p>
          <p class="rec-t-text">车载电器</p>
          <p class="transverse-line"></p>
        </div>
        <div class="rec-detail waterfall" data-pinterest="appliance">
          <!--此处为瀑布流形式布局，内容填充上方法请一定要参考pinterest.js-->
          <!--内容填充上方法请一定要参考pinterest.js!!!!-->
          <!--内容填充上方法请一定要参考pinterest.js!!!!-->
          <div class="rec-d-row">
            <div class="row-detail">
              <a href="#">
                <div class="row-d-img">
                  <img src="images/t4.png" alt=""/>
                </div>
                <p class="row-d-text">EDDY弹簧避震 弹簧避震 弹簧避震 适用于一起系列 正品改装短弹簧</p>
              </a>
              <div class="row-d-info">
                <div class="info-l">
                  <p class="now-price">￥<span class="span">99.00</span></p>
                  <p class="old-price">￥<span>99.00</span></p>
                </div>
                <a class="info-r" href="#">
                  <i class="icon-base i-car-add"></i>
                </a>
              </div>
            </div>
            <div class="row-detail">
              <div class="row-d-img">
                <img src="images/t2.png" alt=""/>
              </div>
            </div>
            <div class="row-detail">
              <div class="row-d-img">
                <img src="images/t5.png" alt=""/>
              </div>
            </div>
          </div>
          <div class="rec-d-row">
            <div class="row-detail">
              <div class="row-d-img">
                <img src="images/t3.png" alt=""/>
              </div>
            </div>
            <div class="row-detail">
              <div class="row-d-img">
                <img src="images/t5.png" alt=""/>
              </div>
            </div>
            <div class="row-detail">
              <div class="row-d-img">
                <img src="images/t2.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="AutoRound">
        <p class="ar-info">
          <span class="info-line"></span>
          <span class="info-text">&copy;版权所有</span>
          <span class="info-line"></span>
        </p>
        <p class="ar">玄武车盟提供技术支持</p>
      </div>
      <div>
        <button @click="test1">test</button>
      </div>
    </div>
  </section>
</template>

<script>
// import Footer from '../components/footer-bar'

import {initHome,homeBanner,initBanner,testAxios} from '../data/axiosData'

//引入banner
import Banner from '../components/Banner'
// import Vue from 'vue'
// import wcSwiper from 'wc-swiper'
// import 'wc-swiper/style.css'
// Vue.use(wcSwiper);

import { mapActions } from 'vuex'

const vm={
  name: "home",
  components:{
    // Footer,
    // Header,
    Banner
  },
  created(){
    // //获取数据填充页面
    this.getHtmlData();
    //获取轮播数据
    initBanner().then(data=>{
      let arr=data;
      let that=this;
      for(let i=0,len=arr.length;i<len;i++){
        that.banner.push(Object.assign(arr[i],{id:i+1}));
      }
      console.log(that.banner);
    })
  },
  mounted(){

  },
  data(){
    return {
      htmlData:[],
      col:2,
      bannerUrl:homeBanner,
      boutiqueUrl:'',
      homeLimit:160/375,
      banner:[],
    }
  },
  watch:{

  },
  computed:{

  },
  filters:{
    getImg(str){
      return str.split(';')[0];
    },
  },
  methods:{
    //获取数据
    getHtmlData(){
      initHome().then(data=>{
        this.htmlData=data.data;
      })
    },
    addCount(){
      this.addCartCount({amount:1});
    },
    test1(){
      testAxios().then(response=>{
        let data=response.data.subjects;
        let html='';
        data.forEach((val)=>html+=val.title+',');
        console.log(html)
      });
    },
    ...mapActions([
      'addCartCount'
    ])
  }

}

export default vm;
</script>

<style scoped>
  .detail-img{
    min-height:80px;
  }


</style>
