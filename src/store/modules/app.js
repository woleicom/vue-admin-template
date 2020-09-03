import { getLanguage } from '@/lang/index'
const state = {
  language: getLanguage(),
  menuToggle: false,
}

const mutations = {
  SET_APP_LANGUAGE: (state, language) => {
    state.language = language;
  },
  SET_APP_MENU_TOGGLE: (state, toggle) => {
    state.menuToggle = toggle;
  },
}

const actions = {
  setAppLanguage({ commit }, language) {
    commit('SET_APP_LANGUAGE', language)
  },
  setAppMenuToggle({ commit }, toggle) {
    commit('SET_APP_MENU_TOGGLE', toggle)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
