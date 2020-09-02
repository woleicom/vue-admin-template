
const Index = () => import(/* webpackChunkName: 'login' */'../views/Index.vue');

const routes = [
  { path: '/index', name: 'Index',component: Index },
  { path: '/test/test1', name: 'Test1',component: () => import('../views/Test/Test1') },
  { path: '/test/test2/test21', name: 'Test21',component: () => import('../views/Test/Test21') },
  { path: '/test/test2/test22', name: 'Test22',component: () => import('../views/Test/Test22') },
  { path: '/demo/demo', name: 'Demo',component: () => import('../views/Test/Demo') },
  { path: '/demo/demo/detail', name: 'Detail',component: () => import('../views/Test/Detail') },
]
export default routes