import {reactive} from 'vue';
import { getLanguage } from '@/lang/index'
export default {
  state: reactive({
    app: {
      language: getLanguage(),
      menuToggle: false,
    },
    user: {
      token:'',
      info: {}
    }
  }),
  setMenuItem(item, key, value) {
    item[key] = value;
  },
  setAppLanguage(language) {
    this.state.app.language = language;
  },
  setAppMenuToggle(toggle) {
    this.state.app.menuToggle = toggle;
  },
  setUserToken(token){
    if(token){
      this.state.user.token = token;
    }else{
      this.state.user.token = ''
    }
  },
  setUserInfo(info) {
    if(info){
      this.state.user.info = info;
    }else{
      this.state.user.info = {}
    }
  },
}