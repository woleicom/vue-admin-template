import VueI18n from 'vue-i18n'
import enLocale from './en_US'
import zhLocale from './zh_CN'
import antdZhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import antdEnUS from 'ant-design-vue/es/locale-provider/en_US';

const messages = {
  en: {
    ...enLocale,
    ...antdZhCN
  },
  zh: {
    ...zhLocale,
    ...antdEnUS
  },
}
export function getLanguage() {
  return 'zh'
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})
// TODO vue-i18n暂不支持vue3.0 
export default i18n
