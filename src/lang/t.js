import { useI18n } from './index'
import store from '../store'
export default (key)=>{
  let {t} = useI18n();
  return t(key, {}, { locale: store.state.app.language });
};