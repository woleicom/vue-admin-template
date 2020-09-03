import {createI18n, useI18n as use} from 'vue-i18n'
import enLocale from './en_US'
import zhLocale from './zh_CN'
import antdZhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import antdEnUS from 'ant-design-vue/es/locale-provider/en_US';
import moment from 'moment';
import monentZhCN from 'moment/locale/zh-cn.js';
export const messages = {
  en: {
    ...enLocale,
    ...antdEnUS,
    ...monentZhCN,
  },
  zh: {
    ...zhLocale,
    ...antdZhCN,
  },
}
export function getLanguage() {
  return 'en'
}
export const langKeys = [
  {value:'zh',label:'简体中文'},
  {value:'en',label:'English'},
]
const i18n = createI18n({
  // legacy: true,
  // options: en | zh | es
  locale: getLanguage(),
  messages:messages
})
export let useI18n = use;
export default i18n
