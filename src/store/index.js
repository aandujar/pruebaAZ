import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isUserLogged: state => {
        return state.user !== null;
    }
},
  mutations: {
    setUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    setUser ({ commit }, user) {
      new Promise((resolve) => {
        commit('setUser', user);
        resolve();
    });
  }
  }
})
