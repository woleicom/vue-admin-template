const state = {
  token:'',
  info: {}
}

const mutations = {
  SET_USER_INFO(state, info){
    if(info){
      state.info = info;
    }else{
      state.info = {}
    }
  },
  SET_USER_TOKEN(state, token) {
    if(token){
      state.token = token;
    }else{
      state.token = ''
    }
  },
}

const actions = {
  setToken({ commit }, token){
    return new Promise(resolve => {
      commit('SET_USER_TOKEN', token);
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
