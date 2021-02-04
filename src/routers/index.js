import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layout/DefaultLayout.vue';
// 基础页面
const View404 = () => import(/* webpackChunkName: '404' */'../views/Others/404.vue');
const View500 = () => import(/* webpackChunkName: '500' */'../views/Others/500.vue');
const Login = () => import(/* webpackChunkName: 'login' */'../views/Login.vue');
export const routes = [
  {
    path: '/',
    redirect: '/index',
    name: 'Root',
    component: DefaultLayout,
    children: []
  },
  {
    path: '/404',
    name: 'Home',
    component: View404
  },
  {
    path: '/500',
    name: 'Home',
    component: View500
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const mode = 'history';
const router = createRouter({
  mode: mode,
  history: createWebHistory(process.env.BASE_URL),
  routes,
  //to, from, savedPosition
  scrollBehavior (to) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }else{
      return { y: 0 }
    }
  }
})
router.$resetRouter = () => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}
router.$removeRoute = (name) => {
  router.removeRoute(name);
};
router.$addRoutes = (params) => {
  params.forEach((route)=>{
    router.addRoute('Root', route);
  })
  if(router.hasRoute('Redirect')) {
    router.removeRoute('Redirect');
  }
  // 匹配所以重定向最后添加
  router.addRoute( {
    path: "/:pathMatch(.*)",
    name: 'Redirect',
    redirect: '/index'
  });
};
export default router