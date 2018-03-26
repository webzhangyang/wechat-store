import Vue from 'vue'

// const baseUrl = 'http://vue.wclimb.site/vi/';
const baseUrl = 'http://arwechatmall.chejiamall.com';
const appUrl = 'http://appa.chejiamall.cn';
const detailPath={
  file:'/api/File',
  login:'/api/Administrator',
  product:'/api/Product',
  lastProduct:'/api/Product/latest/',
  category:'/api/Category',
  freight:'/api/Freight',
  getList:'/api/Product',
  area:'/api/Area',
  storeId:1,
  banner:'/api/Banner'
};
// 首页初始化数据 JSON.parse(response)
export const initHome=()=>Vue.axios.get(baseUrl+detailPath.lastProduct+detailPath.storeId).then(response=>response);
//轮播图
export const initBanner=()=>Vue.axios.get('http://120.76.222.87:8086/arsys-site/api/findAllTopBanner.do').then(response=>response.data.arBannerTopList);
//首页轮播图路径
export const homeBanner=appUrl+detailPath.banner+'?storeID='+detailPath.storeId;
//首页精品
export const homeBoutique=baseUrl+detailPath.lastProduct+detailPath.storeId;

//测试反向代理功能
export const testAxios=()=>Vue.axios.get('/api/v2/movie/top250').then(response=>response);
