import router, {routes} from './routers'
import ruleRoutes from './routers/ruleRoutes'
import store from './store'
import { message } from 'ant-design-vue'
import {sendUserInfo} from './api/login';
import {$iscode} from './utils/app';


//转化当前用户导航菜单权限tree为一维数组list
const getMenuList = (menuTree,menuList) => {
  for(let i = 0; i< menuTree.length; i++){
    menuList.push(menuTree[i]);
    if(menuTree[i].subs && menuTree[i].subs.length>0){
      getMenuList(menuTree[i].subs,menuList);
    }
  }
};
//获取当前用户所有可以访问的路由权限
const getRoutes = (routeList,menuTree) => {
  let menuList =[];
  getMenuList(menuTree,menuList);
  return menuList.map(v=>{
    let route = routeList.find(r => r.path === v.key);
    return route?route:false;
  }).filter(v=>!!v);
};
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  console.log(store);
  const userToken = localStorage.getItem('token');
  if (userToken) {
    // 有token
    // 路径为登录页则跳转到首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let userInfo = JSON.parse(localStorage.getItem('user'));
      if (userInfo && userInfo.menus && userInfo.menus.length>0) {
        next()
      } else {
        try {
          let res = await sendUserInfo()
          if($iscode(res)){
            localStorage.setItem('user', JSON.stringify(res.data));
            store.dispatch('user/setUserInfo',res.data);
            let routesMap = getRoutes(ruleRoutes,res.data.menus)
            routes[0].children = routesMap;
            router.$addRoutes(routes);
            next({ ...to, replace: true })
          }else {
            next(`/login`)
          }
        } catch (error) {
          await store.dispatch('user/setUserToken','')
          await store.dispatch('user/setUserInfo',null)
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          message.error(error || 'Has Error')
          next(`/login`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
