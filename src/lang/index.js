import {createI18n, useI18n as use} from 'vue-i18n'
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
const i18n = createI18n({
  // options: en | zh | es
  locale: getLanguage(),
  messages:messages
})
export let useI18n = use;
export default i18n
