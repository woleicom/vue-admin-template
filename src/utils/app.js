import {message} from 'ant-design-vue';
let __router;
export const setRouter = (router,route)=>{
  __router = {
    router: router,
    route: route
  };
}
export const getRouter = ()=>{
  return __router;
}
export const $iscode = (res, isShowSussessMessage)=>{
  if(res.code === 1){
    isShowSussessMessage && message.success(res.message);
    return true;
  } else {
    isShowSussessMessage && message.error(res.message);
    return false;
  }
}