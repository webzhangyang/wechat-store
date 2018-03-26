import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/pages/home'
import Home2 from '@/components/hello'

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      redirect:'/hello',
      // component: HelloWorld,
    },
    {
      path: '/hello',
      component: Home2,
    },
    {
      path: '/index',
      component: resolve => require(['@/pages/index'], resolve),
      redirect:'/index/home',
      children:[
        {
          path:'home',
          components:{
            default:Home,
            // mask:HelloWorld,
          },
          meta:{
            title:'首页'
          }
        },
        {
          path:'car',
          component: HelloWorld,
          meta:{
            title:'购物车'
          }
        },
        {
          path:'user',
          component: HelloWorld,
          meta:{
            title:'我的'
          }
        }
      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});

export default router
