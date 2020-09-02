import { useI18n } from './index'
export default (key)=>{
  let {t} = useI18n();
  return t(key);
};