import { getLanguage } from '@/lang/index'
const state = {
  language: getLanguage(),
}

const mutations = {
  SET_APP_LANGUAGE: (state, language) => {
    state.language = language;
  },
}

const actions = {
  setAppLanguage({ commit }, language) {
    commit('SET_APP_LANGUAGE', language)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
